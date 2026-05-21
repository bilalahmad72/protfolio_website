export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'joe-jun',
    name: 'Joe Jun L.',
    role: 'CEO of EXP.',
    avatar: '/images/hk.png',
    quote: 'Bilal has great attention to detail, a responsible character and a strong foundation of flutter skills. He communicates proactively and provides clear updates after testing his code before submitting pull requests. He has helped our team achieve greater product polish, and initiated some improvements that were beyond his given tasks yet valuable.'
  },
  {
    id: 'chad-adams',
    name: 'Chad Adams',
    role: 'Consultant, Optimization Analyst / Data Scientist',
    avatar: '/images/us.png',
    quote: 'Bilal is amazing. We have worked together for almost a year and a half. His skills are unlike anyone else I have ever worked with. Beyond that, he is talented in both UX design and the implementation of that design. Bilal is exceptionally talented and has always done great work for me.'
  },
  {
    id: 'arian-arenas',
    name: 'Arian Arenas',
    role: 'Project Manager',
    avatar: '/images/co.png',
    quote: 'Bilal Ahmad did an EXCEPTIONAL job! His professionalism and attention to detail exceeded all expectations. Working with him was seamless thanks to his quick responsiveness and perfect cooperation. 👍'
  },
  {
    id: 'diogo-lo',
    name: 'Diogo Lo',
    role: 'Project Manager',
    avatar: '/images/pt.png',
    quote: 'Bilal has remarkable attention to detail, and met all the requirements on first revision. He has the savoir-faire to make magic happen in flutter. Also an effective communicator. All while maintaining a timely delivery. Will do business with him again.'
  },
  {
    id: 'alper-arslan',
    name: 'Alper A.',
    role: 'Lead Developer',
    avatar: '/images/tr.png',
    quote: 'Bilal has worked for me on a number of flutter projects in the past, he is a brilliant developer he is very professional, fast and he delivers the projects on time. I highly recommend Bilal for your projects.'
  },
  {
    id: 'juan-cardona',
    name: 'Juan Cardona',
    role: 'Project Manager',
    avatar: '/images/us.png',
    quote: 'I engaged Bilal\'s services to assist me with the front-end development of a critically significant project in Flutter. I am pleased to express my utmost satisfaction with his exceptional work. Bilal not only demonstrated a remarkable ability to deliver a visually appealing design and an exceptional user experience, but he also exhibited a keen aptitude for enhancing the original concept. The outcome of his efforts is an outstanding Flutter front-end with an exemplary user experience.'
  }
];
