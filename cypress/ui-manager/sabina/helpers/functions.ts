const formatDateForAriaLabel = (date: Date): string => {
  const day = date.getDate();
  const dayName = date.toLocaleDateString('en-GB', { weekday: 'long' });
  const monthName = date.toLocaleDateString('en-GB', { month: 'long' });
  const year = date.getFullYear();

  return `${day}, ${dayName} ${monthName} ${year}`;
};

export function selectDateInIframe(date: Date)  {
  const formattedDate = formatDateForAriaLabel(date);

  cy.get('iframe.U73P_q')
          .its('0.contentDocument')
          .find(`button[aria-label="${formattedDate}"]`)
          .click();
};

export function CheckInRooms(date: Date)  {
  const formattedDate = formatDateForAriaLabel(date);

  cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#hotel-container > section > div > div > form > ul > li.check-in > div.calendar-popup.s-field.s-separator.visible')
          .should('be.visible') 
          .find(`button[aria-label="${formattedDate}"]`)
          .click();
          
};

export function CheckOutRooms(date: Date)  {
  const formattedDate = formatDateForAriaLabel(date);

  cy.get('iframe.nKphmK[title="Book a Room"]')
          .its('0.contentDocument')
          .find('#hotel-container > section > div > div > form > ul > li.check-out > div.calendar-popup.s-field.s-separator.visible')
          .should('be.visible') 
          .find(`button[aria-label="${formattedDate}"]`)
          .click();
          
};