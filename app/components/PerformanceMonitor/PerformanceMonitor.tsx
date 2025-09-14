'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface PerformanceMonitorProps {
  enabled: boolean;
}

const MonitorContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  z-index: 1000;
  max-width: 300px;
  contain: layout style;
`;

const Metric = styled.div`
  margin: 2px 0;
  display: flex;
  justify-content: space-between;
`;

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ enabled }) => {
  const [metrics, setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
    ttfb: 0,
    jsSize: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    const updateMetrics = () => {
      // Get Core Web Vitals
      if ('PerformanceObserver' in window) {
        // First Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[entries.length - 1];
          if (fcp) {
            setMetrics(prev => ({ ...prev, fcp: Math.round(fcp.startTime) }));
          }
        }).observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          if (lcp) {
            setMetrics(prev => ({ ...prev, lcp: Math.round(lcp.startTime) }));
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fid = entries[entries.length - 1] as PerformanceEventTiming;
          if (fid && 'processingStart' in fid) {
            setMetrics(prev => ({ ...prev, fid: Math.round(fid.processingStart - fid.startTime) }));
          }
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        new PerformanceObserver((list) => {
          let cls = 0;
          list.getEntries().forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          });
          setMetrics(prev => ({ ...prev, cls: Math.round(cls * 1000) / 1000 }));
        }).observe({ entryTypes: ['layout-shift'] });
      }

      // Time to First Byte
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        setMetrics(prev => ({ ...prev, ttfb: Math.round(navigation.responseStart - navigation.requestStart) }));
      }

      // JavaScript bundle size estimation
      const scripts = document.querySelectorAll('script[src]');
      let totalSize = 0;
      scripts.forEach(script => {
        const src = script.getAttribute('src');
        if (src && src.includes('_next/static/chunks/')) {
          // Estimate size based on URL patterns
          totalSize += 50; // Rough estimate per chunk
        }
      });
      setMetrics(prev => ({ ...prev, jsSize: totalSize }));
    };

    // Update metrics after page load
    if (document.readyState === 'complete') {
      updateMetrics();
    } else {
      window.addEventListener('load', updateMetrics);
    }

    // Update metrics periodically
    const interval = setInterval(updateMetrics, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', updateMetrics);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <MonitorContainer>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Performance Monitor</div>
      <Metric>
        <span>FCP:</span>
        <span style={{ color: metrics.fcp < 1800 ? '#4CAF50' : '#FF5722' }}>
          {metrics.fcp}ms
        </span>
      </Metric>
      <Metric>
        <span>LCP:</span>
        <span style={{ color: metrics.lcp < 2500 ? '#4CAF50' : '#FF5722' }}>
          {metrics.lcp}ms
        </span>
      </Metric>
      <Metric>
        <span>FID:</span>
        <span style={{ color: metrics.fid < 100 ? '#4CAF50' : '#FF5722' }}>
          {metrics.fid}ms
        </span>
      </Metric>
      <Metric>
        <span>CLS:</span>
        <span style={{ color: metrics.cls < 0.1 ? '#4CAF50' : '#FF5722' }}>
          {metrics.cls}
        </span>
      </Metric>
      <Metric>
        <span>TTFB:</span>
        <span style={{ color: metrics.ttfb < 600 ? '#4CAF50' : '#FF5722' }}>
          {metrics.ttfb}ms
        </span>
      </Metric>
      <Metric>
        <span>JS Chunks:</span>
        <span>{metrics.jsSize}KB</span>
      </Metric>
    </MonitorContainer>
  );
};

export default PerformanceMonitor; 