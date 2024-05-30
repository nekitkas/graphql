export type Event = 0 | 131 | 148 | 168;

export function xpTotal(event: Event): string {
	return ` {
      total_xp: transaction_aggregate(
        where: {type: {_eq: "xp"} ${event !== 0 ? `, eventId: {_eq: ${event}}` : ''}}
      ) {
        aggregate {
          sum {
            amount
          }
        }
      }
    }
    
    `;
}

export function xpByEvent(event: Event): string {
	return `{
  user {
    xps ${event !== 0 ? `(where: { event: { id: { _eq: ${event} } } })` : ''} {
      amount
      path
      
      event {
        id
        
      }
    }
  }
}`;
}

export function getXp(): string {
	return `
query GetXp {
  transaction(where: {type: { _like: "skill_%" } }) {
    type
    amount
  }
}
`;
}
