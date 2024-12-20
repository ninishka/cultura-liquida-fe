import React, { FC, useRef, useState } from 'react';
import Image from 'next/image';
import { Tooltip } from 'antd'
import copyBtn from '@/app/icons/copyBtn.svg'
import {
  BankInfoBlock,
  BankInfoText,
  BankNumberBlock,
  BankInfoNumber
} from './styled'

export interface BankingBoxProps {
  title: string;
  num: string | number;
}

const BankingBox: FC<BankingBoxProps> = ({ title, num }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const numberRef = useRef(null);

  const copyToClipboard = () => {
    const textToCopy = numberRef.current?.textContent || '';
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 1000);
    })
    .catch(err => {
      console.error('Error al copiar el texto:', err);
    });
  };

  return (
    <BankInfoBlock>
      <BankInfoText>{title}</BankInfoText>
      <BankNumberBlock>
        <BankInfoNumber ref={numberRef} aria-label={`Número de cuenta: ${num}`}>{num}</BankInfoNumber>
        <Tooltip 
          title={showTooltip ? 'Copiado!' : ''} 
          aria-live={showTooltip ? 'polite' : ''}
          open={showTooltip}
        >
          <Image
            sizes="100vw"
            src={copyBtn}
            alt="Número de copia"
            width={18}
            height={18}
            onClick={copyToClipboard}
            aria-label="Copiar número de cuenta icono"
            style={{ cursor: 'pointer' }}
            tabIndex={0} // keyboard nav
          />
        </Tooltip>
      </BankNumberBlock>
    </BankInfoBlock>
  );
}

export default BankingBox