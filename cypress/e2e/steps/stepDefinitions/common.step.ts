
export const formatDateForSearch = (date) => {
    const day = date.getDate();
    const year = date.getFullYear();
    const monthMap = {
      0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun',
      6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec'
    };
    const month = monthMap[date.getMonth()];
    return `${day} ${month} ${year}`;
  };
  

  export const formatDateForAriaLabel = (date) => {
    const day = date.getDate();
    const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
    const monthName = date.toLocaleDateString('en-GB', { month: 'long' });
    const year = date.getFullYear();
    return `${day}, ${dayName} ${monthName} ${year}`;
  };
  
  export const selectDate = (iframeSelector, date, field) => {
    const fieldSelector = field === 'Check-In' ? '#check-in' : '#check-out';
    const fieldValueSelector = field === 'Check-In' ? '#check-in-value' : '#check-out-value';

    cy.get(iframeSelector)
      .its('0.contentDocument')
      .find(`#search-widget ${fieldSelector}`)
      .click();

    selectDateInIframe(iframeSelector, date);

    return fieldValueSelector; // Returns the selector to verify the displayed date
};

  
  // Select a specific date within an iframe calendar
  export const selectDateInIframe = (iframeSelector, date) => {
    const formattedDate = formatDateForAriaLabel(date);
    cy.get(iframeSelector)
      .its('0.contentDocument')
      .find(`button[aria-label="${formattedDate}"]`)
      .click();
  };
  
  