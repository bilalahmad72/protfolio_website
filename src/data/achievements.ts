export interface Achievement {
  id: string;
  value: string;
  label: string;
  iconName: 'check-circle' | 'award' | 'clock' | 'briefcase' | 'refresh-cw' | 'handshake';
}

export const achievements: Achievement[] = [
  {
    id: 'fiverr-orders',
    value: '400+',
    label: 'Fiverr Orders Delivered',
    iconName: 'check-circle'
  },
  {
    id: 'upwork-contracts',
    value: '50+',
    label: 'Upwork Contracts Completed',
    iconName: 'handshake'
  },
  {
    id: 'freelancer-status',
    value: 'Top Rated Plus',
    label: 'Upwork Status',
    iconName: 'award'
  },
  {
    id: 'hours-logged',
    value: '2000+',
    label: 'Hours Logged',
    iconName: 'clock'
  },
  {
    id: 'years-experience',
    value: '6+',
    label: 'Years Experience',
    iconName: 'briefcase'
  },
  {
    id: 'repeat-clients',
    value: '65%',
    label: 'Repeat Clients',
    iconName: 'refresh-cw'
  }
];