import { useState, useEffect } from 'react';
import Button from '../common/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    document.title = 'NexusBlog - Contact Us';
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Replace with actual API call
      // await api.post('/contact', formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error sending message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email Us',
      description: "Send us an email and we'll respond within 24 hours",
      contact: 'hello@nexusblog.com',
      link: 'mailto:alhadjioum0@gmail.com',
    },
    {
      icon: 'fas fa-phone',
      title: 'Call Us',
      description: "Give us a call and we'll be happy to assist you",
      contact: '+237 696 55 52 20',
      link: 'tel:+237696555220',
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Visit Us',
      description: 'Come say hello at our headquarters',
      contact: 'Yaounde City, Cameroon',
      link: 'https://maps.google.com',
    },
    {
      icon: 'fas fa-comments',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      link: '#',
    },
  ];

  const teamMembers = [
    {
      name: 'Alhadji Oumate',
      role: 'Founder & CEO',
      image:
        'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
      bio: 'Passionate about connecting writers and readers through meaningful content.',
    },
    {
      name: 'Alhadji Oumate',
      role: 'Head of Community',
      image:
        'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
      bio: 'Building vibrant communities where every voice matters and every story counts.',
    },
    {
      name: 'Alhadji Oumate',
      role: 'Content Director',
      image:
        'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png',
      bio: 'Curating exceptional content and helping writers reach their full potential.',
    },
  ];

  return (
    <div className='pt-24 pb-16'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-[#544cdb]  via-purple-600 to-purple-600 text-white py-16'>
        <div className='max-w-6xl mx-auto px-4 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold tracking-tighter mb-6'>
            Get in Touch
          </h1>
          <p className='text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto'>
            Have a question, suggestion, or just want to say hello? We'd love to
            hear from you.
          </p>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-4 -mt-8 relative z-10'>
        {/* Contact Methods */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16'>
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group'
            >
              <div className='text-center'>
                <div className='w-16 h-16 bg-[#544cdb] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                  <i className={`${method.icon} text-2xl text-white`}></i>
                </div>
                <h3 className='text-lg font-semibold mb-2'>{method.title}</h3>
                <p className='text-gray-600 text-sm mb-3'>
                  {method.description}
                </p>
                <p className='text-[#544cdb] font-medium text-sm'>
                  {method.contact}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Contact Form and Info */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
          {/* Contact Form */}
          <div className='bg-white rounded-lg shadow-lg p-8'>
            <h2 className='text-3xl font-bold tracking-tighter mb-6'>
              Send us a Message
            </h2>

            {submitStatus === 'success' && (
              <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6'>
                <div className='flex items-center'>
                  <i className='fas fa-check-circle mr-2'></i>
                  <span>
                    Your message has been sent successfully! We'll get back to
                    you soon.
                  </span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'>
                <div className='flex items-center'>
                  <i className='fas fa-exclamation-circle mr-2'></i>
                  <span>
                    There was an error sending your message. Please try again.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Name *
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cdb] focus:border-transparent outline-none'
                    placeholder='Your full name'
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Email *
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cdb] focus:border-transparent outline-none'
                    placeholder='your@email.com'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Subject *
                </label>
                <select
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cdb] focus:border-transparent outline-none'
                >
                  <option value=''>Select a subject</option>
                  <option value='general'>General Inquiry</option>
                  <option value='support'>Technical Support</option>
                  <option value='partnership'>Partnership</option>
                  <option value='feedback'>Feedback</option>
                  <option value='other'>Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Message *
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cdb] focus:border-transparent outline-none resize-none'
                  placeholder='Tell us how we can help you...'
                />
              </div>

              <Button
                type='submit'
                variant='primary'
                disabled={isSubmitting}
                className='w-full'
              >
                {isSubmitting ? (
                  <>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <i className='fas fa-paper-plane'></i>
                    <span>Send Message</span>
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Additional Info */}
          <div className='space-y-8'>
            <div className='bg-white rounded-lg shadow-lg p-8'>
              <h3 className='text-2xl font-bold tracking-tighter mb-4'>
                Why Contact Us?
              </h3>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <i className='fas fa-lightbulb text-[#544cdb] mt-1'></i>
                  <div>
                    <h4 className='font-semibold'>Share Your Ideas</h4>
                    <p className='text-gray-600 text-sm'>
                      Have a suggestion for improving NexusBlog? We'd love to
                      hear it!
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <i className='fas fa-handshake text-[#544cdb] mt-1'></i>
                  <div>
                    <h4 className='font-semibold'>Partnership Opportunities</h4>
                    <p className='text-gray-600 text-sm'>
                      Interested in collaborating or partnering with us?
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <i className='fas fa-question-circle text-[#544cdb] mt-1'></i>
                  <div>
                    <h4 className='font-semibold'>Get Support</h4>
                    <p className='text-gray-600 text-sm'>
                      Need help with your account or have technical questions?
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <i className='fas fa-heart text-[#544cdb] mt-1'></i>
                  <div>
                    <h4 className='font-semibold'>Share Feedback</h4>
                    <p className='text-gray-600 text-sm'>
                      Let us know how we're doing and how we can serve you
                      better.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-r from-[#544cdb] to-purple-600 rounded-lg p-8 text-white'>
              <h3 className='text-2xl font-bold mb-4'>Join Our Community</h3>
              <p className='text-purple-100 mb-6'>
                Stay connected with us on social media for the latest updates,
                writing tips, and community highlights.
              </p>
              <div className='flex gap-4'>
                <a
                  href='#'
                  className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'
                >
                  <i className='fab fa-twitter'></i>
                </a>
                <a
                  href='#'
                  className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'
                >
                  <i className='fab fa-facebook'></i>
                </a>
                <a
                  href='#'
                  className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'
                >
                  <i className='fab fa-instagram'></i>
                </a>
                <a
                  href='#'
                  className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors'
                >
                  <i className='fab fa-linkedin'></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className='bg-white rounded-lg shadow-lg p-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold tracking-tighter mb-4'>
              Meet Our Team
            </h2>
            <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
              The passionate people behind NexusBlog who are dedicated to
              creating the best platform for writers and readers.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {teamMembers.map((member, index) => (
              <div key={index} className='text-center group'>
                <div className='relative mb-4'>
                  <img
                    src={member.image}
                    alt={member.name}
                    className='w-32 h-32 rounded-full object-cover mx-auto group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 rounded-full bg-gradient-to-t from-[#544cdb]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </div>
                <h3 className='text-xl font-semibold mb-1'>{member.name}</h3>
                <p className='text-[#544cdb] font-medium mb-3'>{member.role}</p>
                <p className='text-gray-600 text-sm'>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
