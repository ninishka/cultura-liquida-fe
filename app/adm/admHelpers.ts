export const handleSort = (key, sortConfig, setSortConfig) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  
  export const getSortIndicator = (key, sortConfig) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓';
    }
    return '↓';
  };
  
  export const getSortingData = (data, sortConfig): any[] => {
    return [...data].sort((a, b) => {
      if (sortConfig.key) {
        let aValue
        let bValue
        
        if (sortConfig.key === 'name' || sortConfig.key === 'surname') {
            aValue = a.form_data ? a.form_data[sortConfig.key] : undefined;
            bValue = b.form_data ? b.form_data[sortConfig.key] : undefined;
        } else {
            aValue = a[sortConfig.key];
            bValue = b[sortConfig.key];
        }

        if (aValue === undefined || bValue === undefined) {
            return 0;
        }
  
        if (typeof aValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else if (typeof aValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
      }
      return 0;
    });
  };
  
  export const fieldsForRender = [
    {value: '_id', label: 'ID'},
    {value: 'name', label: 'Name'},
    {value: 'surname', label: 'Surname'},
    {value: 'status', label: 'Status'},
    {value: 'totalCost', label: 'Total Price'},
    {value: 'updatedAt', label: 'Updated at'}
  ]