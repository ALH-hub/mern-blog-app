import { useEffect } from 'react';
import { Link } from 'react-router';
import Button from '../common/Button';

const About = () => {
  useEffect(() => {
    document.title = 'NexusBlog - About Us';
  }, []);

  const stats = [
    { number: '10K+', label: 'Active Writers' },
    { number: '50K+', label: 'Published Articles' },
    { number: '100K+', label: 'Monthly Readers' },
    { number: '25+', label: 'Countries Reached' },
  ];

  const values = [
    {
      icon: 'fas fa-users',
      title: 'Community First',
      description:
        'We believe in the power of community. Every voice matters, every story has value, and together we create something greater than the sum of our parts.',
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description:
        'We constantly evolve and innovate to provide the best tools and features that empower writers and enhance the reading experience.',
    },
    {
      icon: 'fas fa-heart',
      title: 'Authenticity',
      description:
        'We encourage genuine, authentic storytelling. Real experiences, honest perspectives, and meaningful connections drive our platform.',
    },
    {
      icon: 'fas fa-globe',
      title: 'Accessibility',
      description:
        'Quality content should be accessible to everyone. We strive to break down barriers and make knowledge sharing universal.',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description:
        'NexusBlog was founded with a simple mission: to create a platform where every voice can be heard and every story can find its audience.',
    },
    {
      year: '2021',
      title: 'Community Growth',
      description:
        'We reached our first 1,000 writers and launched our community features, fostering connections between creators and readers.',
    },
    {
      year: '2022',
      title: 'Platform Enhancement',
      description:
        'Introduced advanced editing tools, improved search functionality, and launched our mobile app to reach writers everywhere.',
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description:
        'Expanded internationally, added multi-language support, and established partnerships with educational institutions.',
    },
    {
      year: '2024',
      title: 'AI Integration',
      description:
        'Integrated AI-powered writing assistance and personalized content recommendations while maintaining human creativity at the core.',
    },
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image:
        'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
      bio: 'Former journalist turned tech entrepreneur, passionate about democratizing content creation.',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image:
        'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
      bio: 'Full-stack developer with 10+ years experience building scalable platforms.',
      social: {
        linkedin: '#',
        github: '#',
      },
    },
    {
      name: 'Emily Davis',
      role: 'Head of Content',
      image:
        'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
      bio: 'Content strategist and published author with expertise in digital storytelling.',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'Alex Rodriguez',
      role: 'Head of Design',
      image:
        'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
      bio: 'UX/UI designer focused on creating intuitive and beautiful user experiences.',
      social: {
        linkedin: '#',
        dribbble: '#',
      },
    },
  ];

  return (
    <div className='pt-24 pb-16'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-[#544cdb] via-purple-600 to-pink-600 text-white py-20'>
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <h1 className='text-4xl md:text-6xl font-bold tracking-tighter mb-6'>
            About{' '}
            <span className='bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent'>
              NexusBlog
            </span>
          </h1>
          <p className='text-xl md:text-2xl text-purple-100 max-w-4xl mx-auto leading-relaxed'>
            We're on a mission to connect ideas, amplify voices, and create a
            world where every story matters. Join us in building the future of
            digital storytelling.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className='bg-white py-16 -mt-8 relative z-10'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat, index) => (
              <div key={index} className='text-center'>
                <div className='text-3xl md:text-4xl font-bold text-[#544cdb] mb-2'>
                  {stat.number}
                </div>
                <div className='text-gray-600 font-medium'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4'>
        {/* Story Section */}
        <div className='py-16'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <h2 className='text-4xl font-bold tracking-tighter mb-6'>
                Our Story
              </h2>
              <div className='space-y-4 text-gray-700 leading-relaxed'>
                <p>
                  NexusBlog was born from a simple observation: great ideas and
                  stories were scattered across the internet, but there wasn't a
                  single place where writers could truly connect with their
                  ideal audience and readers could discover content that
                  genuinely mattered to them.
                </p>
                <p>
                  In 2020, our founder Sarah Johnson, a former journalist
                  frustrated with traditional publishing limitations, envisioned
                  a platform that would democratize content creation while
                  maintaining quality and fostering genuine connections between
                  writers and readers.
                </p>
                <p>
                  Today, NexusBlog has grown into a thriving community of
                  writers, thinkers, and readers from around the world. We've
                  helped thousands of writers find their voice and millions of
                  readers discover content that inspires, educates, and
                  entertains.
                </p>
              </div>
            </div>
            <div className='relative'>
              <img
                src='https://cdn.pixabay.com/photo/2016/12/19/10/16/hands-1917895_1280.png'
                alt='Team collaboration'
                className='rounded-lg shadow-lg'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#544cdb]/20 to-transparent rounded-lg'></div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className='py-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <div className='w-16 h-16 bg-[#544cdb] rounded-full flex items-center justify-center mb-6'>
                <i className='fas fa-bullseye text-2xl text-white'></i>
              </div>
              <h3 className='text-2xl font-bold tracking-tighter mb-4'>
                Our Mission
              </h3>
              <p className='text-gray-700 leading-relaxed'>
                To empower every individual to share their unique perspective
                and connect with others through the power of storytelling. We
                believe that when ideas flow freely and authentically, we create
                a more informed, empathetic, and connected world.
              </p>
            </div>
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <div className='w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6'>
                <i className='fas fa-eye text-2xl text-white'></i>
              </div>
              <h3 className='text-2xl font-bold tracking-tighter mb-4'>
                Our Vision
              </h3>
              <p className='text-gray-700 leading-relaxed'>
                To become the world's most trusted platform for meaningful
                content, where quality ideas transcend boundaries and every
                voice has the potential to inspire, educate, and create positive
                change in the world.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className='py-16'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold tracking-tighter mb-4'>
              Our Values
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              These core principles guide everything we do and shape the culture
              of our platform
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300'
              >
                <div className='w-16 h-16 bg-gradient-to-r from-[#544cdb] to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <i className={`${value.icon} text-2xl text-white`}></i>
                </div>
                <h3 className='text-xl font-semibold mb-3'>{value.title}</h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className='py-16'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold tracking-tighter mb-4'>
              Our Journey
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              From a simple idea to a global platform - here's how we've grown
              together
            </p>
          </div>
          <div className='relative'>
            <div className='absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#544cdb] hidden md:block'></div>
            <div className='space-y-12'>
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className='flex-1 md:pr-8'>
                    <div
                      className={`bg-white rounded-lg shadow-lg p-6 ${
                        index % 2 === 1 ? 'md:ml-8' : ''
                      }`}
                    >
                      <div className='text-[#544cdb] font-bold text-lg mb-2'>
                        {milestone.year}
                      </div>
                      <h3 className='text-xl font-semibold mb-3'>
                        {milestone.title}
                      </h3>
                      <p className='text-gray-600'>{milestone.description}</p>
                    </div>
                  </div>
                  <div className='hidden md:block w-4 h-4 bg-[#544cdb] rounded-full relative z-10'></div>
                  <div className='flex-1 md:pl-8'></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className='py-16'>
          <div className='text-center mb-12'>
            <h2 className='text-4xl font-bold tracking-tighter mb-4'>
              Meet Our Team
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              The passionate individuals behind NexusBlog who work tirelessly to
              make your experience exceptional
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group'
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={member.image}
                    alt={member.name}
                    className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  <div className='absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='flex gap-3'>
                      {Object.entries(member.social).map(([platform, link]) => (
                        <a
                          key={platform}
                          href={link}
                          className='w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'
                        >
                          <i className={`fab fa-${platform} text-sm`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold mb-1'>{member.name}</h3>
                  <p className='text-[#544cdb] font-medium mb-3'>
                    {member.role}
                  </p>
                  <p className='text-gray-600 text-sm'>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='py-16'>
          <div className='bg-gradient-to-r from-[#544cdb] to-purple-600 rounded-lg p-12 text-white text-center'>
            <h2 className='text-3xl md:text-4xl font-bold tracking-tighter mb-6'>
              Ready to Join Our Story?
            </h2>
            <p className='text-xl text-purple-100 mb-8 max-w-3xl mx-auto'>
              Whether you're a writer looking to share your voice or a reader
              seeking meaningful content, there's a place for you in the
              NexusBlog community.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Link to='/auth/register'>
                <Button
                  variant='outline'
                  className='bg-white text-[#544cdb] border-white hover:bg-gray-100'
                >
                  <i className='fas fa-user-plus'></i>
                  <span>Join as Writer</span>
                </Button>
              </Link>
              <Link to='/discover'>
                <Button
                  variant='outline'
                  className='border-white text-white hover:bg-white/10'
                >
                  <i className='fas fa-book-open'></i>
                  <span>Start Reading</span>
                </Button>
              </Link>
              <Link to='/contact'>
                <Button
                  variant='outline'
                  className='border-white text-white hover:bg-white/10'
                >
                  <i className='fas fa-envelope'></i>
                  <span>Contact Us</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
