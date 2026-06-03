export const CATEGORIES = [
  'Phones', 'Laptops', 'Student ID Cards', 'Bags', 'Books',
  'Chargers', 'Keys', 'Wallets', 'Clothing', 'Accessories', 'Other',
];

export const CAMPUS_NAME = 'Accra Technical University';

export const CATEGORY_ICONS = {
  'Phones': '📱', 'Laptops': '💻', 'Student ID Cards': '🪪',
  'Bags': '🎒', 'Books': '📚', 'Chargers': '🔌',
  'Keys': '🔑', 'Wallets': '👜', 'Clothing': '👕',
  'Accessories': '⌚', 'Other': '📦',
};

export const MOCK_USERS = [
  {
    id: 'user1', name: 'Adaeze Nwosu', email: 'a.nwosu@unilag.edu.ng',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', faculty: 'Engineering', level: '300 Level',
    joinedAt: '2024-01-15', isAdmin: false, isVerified: true,
    itemsReported: 5, itemsRecovered: 3, bio: 'Helping the campus community recover lost items.',
  },
  {
    id: 'user2', name: 'Emeka Obi', email: 'e.obi@unilag.edu.ng',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', faculty: 'Sciences', level: '200 Level',
    joinedAt: '2024-03-01', isAdmin: false, isVerified: true,
    itemsReported: 3, itemsRecovered: 2, bio: 'Always happy to help others find their stuff.',
  },
  {
    id: 'user3', name: 'Zainab Hassan', email: 'z.hassan@unilag.edu.ng',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', faculty: 'Law', level: '400 Level',
    joinedAt: '2023-09-10', isAdmin: false, isVerified: true,
    itemsReported: 8, itemsRecovered: 6, bio: 'Lost & Found ambassador.',
  },
  {
    id: 'admin1', name: 'Dr. Kunle Adeyemi', email: 'admin@unilag.edu.ng',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', joinedAt: '2023-01-01',
    isAdmin: true, isVerified: true, itemsReported: 0, itemsRecovered: 0, bio: 'Platform Administrator',
  },
  {
    id: 'current', name: 'David Adebayo', email: 'd.adebayo@unilag.edu.ng',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', faculty: 'Business Administration', level: '300 Level',
    joinedAt: '2024-02-20', isAdmin: false, isVerified: true,
    itemsReported: 2, itemsRecovered: 1, bio: 'Helping the community stay connected.',
  },
];

export const MOCK_ITEMS = [
  {
    id: 'item1', type: 'lost', title: 'Samsung Galaxy S23 - Black',
    description: 'Lost my Samsung Galaxy S23 in the Faculty of Engineering library on the second floor. Has a cracked screen protector and a blue phone case. Last seen around 2pm on Thursday. Please contact me if found!',
    category: 'Phones',
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=450&fit=crop&q=80'],
    reporterId: 'current', reporterName: 'David Adebayo',
    reporterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', location: 'Faculty of Engineering Library, 2nd Floor',
    date: '2025-05-20', createdAt: '2025-05-20T15:30:00Z',
    status: 'active', views: 87, claimCount: 2,
    tags: ['samsung', 'galaxy', 'phone', 's23'],
    contactMethod: 'both',
    verificationQuestions: ['What color is the phone case?', 'What app was last opened?'],
  },
  {
    id: 'item2', type: 'found', title: 'Black Backpack with Laptop Inside',
    description: 'Found a black Jansport backpack near the New Hall cafeteria. Contains what appears to be a laptop and some books. I have secured the bag at the Faculty of Sciences admin office. Please describe the contents to claim.',
    category: 'Bags',
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=450&fit=crop&q=80'],
    reporterId: 'user1', reporterName: 'Adaeze Nwosu',
    reporterAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', location: 'New Hall Cafeteria Area',
    date: '2025-05-21', createdAt: '2025-05-21T11:00:00Z',
    status: 'active', views: 134, claimCount: 3,
    tags: ['backpack', 'jansport', 'laptop', 'bag'],
    contactMethod: 'chat',
    verificationQuestions: ['What brand is the laptop?', 'What color are the bag straps?', 'Name one book inside the bag?'],
  },
  {
    id: 'item3', type: 'lost', title: 'UNILAG Student ID Card - 2021/2022',
    description: 'Lost my student ID card somewhere between the Faculty of Law and the Multipurpose Hall. The card has my photo on it. Registration number starts with 180. Very urgent as I need it for exams.',
    category: 'Student ID Cards',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=450&fit=crop&q=80'],
    reporterId: 'user3', reporterName: 'Zainab Hassan',
    reporterAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', location: 'Faculty of Law – Multipurpose Hall corridor',
    date: '2025-05-22', createdAt: '2025-05-22T08:00:00Z',
    status: 'active', views: 52, claimCount: 0,
    tags: ['id card', 'student id', 'law', 'registration'],
    contactMethod: 'both',
  },
  {
    id: 'item4', type: 'found', title: 'Set of Keys with Red Keychain',
    description: 'Found a set of keys with a distinctive red keychain near the main gate security post. Has about 4 keys including what looks like a Yale key and a padlock key. Kept safely with me.',
    category: 'Keys',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=450&fit=crop&q=80'],
    reporterId: 'user2', reporterName: 'Emeka Obi',
    reporterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', location: 'Main Gate Area',
    date: '2025-05-21', createdAt: '2025-05-21T14:20:00Z',
    status: 'active', views: 41, claimCount: 1,
    tags: ['keys', 'keychain', 'red', 'yale'],
    contactMethod: 'chat',
    verificationQuestions: ['How many keys are on the ring?', 'What is on the keychain besides keys?'],
  },
  {
    id: 'item5', type: 'lost', title: 'MacBook Pro 14" (Space Grey)',
    description: 'Lost my MacBook Pro 14-inch Space Grey in the Faculty of Science computer lab. Had stickers on the lid including a UNILAG sticker and a NASA sticker. Charger was also with it. This is urgent.',
    category: 'Laptops',
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=450&fit=crop&q=80'],
    reporterId: 'user1', reporterName: 'Adaeze Nwosu',
    reporterAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', location: 'Faculty of Sciences Computer Lab',
    date: '2025-05-19', createdAt: '2025-05-19T16:00:00Z',
    status: 'claimed', views: 201, claimCount: 5,
    tags: ['macbook', 'laptop', 'apple', 'pro'],
    contactMethod: 'both',
    verificationQuestions: ['What stickers are on the laptop lid?', 'What is the name of the laptop?'],
  },
  {
    id: 'item6', type: 'found', title: 'Brown Leather Wallet',
    description: 'Found a brown leather wallet in the Moremi Hall common room. Contains some cash, an ATM card and what looks like a student ID. I have not opened the wallet further. Please describe details to verify.',
    category: 'Wallets',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=450&fit=crop&q=80'],
    reporterId: 'user3', reporterName: 'Zainab Hassan',
    reporterAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', location: 'Moremi Hall Common Room',
    date: '2025-05-20', createdAt: '2025-05-20T19:00:00Z',
    status: 'recovered', views: 78, claimCount: 2,
    tags: ['wallet', 'leather', 'brown', 'moremi'],
    contactMethod: 'chat',
  },
  {
    id: 'item7', type: 'lost', title: 'Laptop Charger - HP 65W',
    description: 'Lost my HP 65W laptop charger in the Faculty of Business Administration lecture hall. It has a small blue sticker with my initials "DA" written on it. Please return if found!',
    category: 'Chargers',
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=450&fit=crop&q=80'],
    reporterId: 'current', reporterName: 'David Adebayo',
    reporterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', location: 'Faculty of Business Administration, LH 201',
    date: '2025-05-22', createdAt: '2025-05-22T10:00:00Z',
    status: 'active', views: 23, claimCount: 0,
    tags: ['charger', 'hp', 'laptop', 'da'],
    contactMethod: 'both',
  },
  {
    id: 'item8', type: 'found', title: 'Blue Academic Textbook Bundle',
    description: 'Found 3 blue-covered textbooks near the Engineering building entrance. Two engineering textbooks and one calculus book. The owner might be an engineering student.',
    category: 'Books',
    images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=450&fit=crop&q=80'],
    reporterId: 'user2', reporterName: 'Emeka Obi',
    reporterAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
    campus: 'University of Lagos', location: 'Faculty of Engineering, Main Entrance',
    date: '2025-05-21', createdAt: '2025-05-21T08:30:00Z',
    status: 'active', views: 35, claimCount: 1,
    tags: ['books', 'textbook', 'engineering', 'calculus'],
    contactMethod: 'chat',
    verificationQuestions: ['What are the titles of the books?', 'Is your name written anywhere in the books?'],
  },
];

export const MOCK_CLAIM  = [
  {
    id: 'claim1', itemId: 'item2', itemTitle: 'Black Backpack with Laptop Inside',
    claimantId: 'current', claimantName: 'David Adebayo',
    claimantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80',
    answers: [
      { question: 'What brand is the laptop?', answer: 'Dell Inspiron 15' },
      { question: 'What color are the bag straps?', answer: 'Black with grey padding' },
      { question: 'Name one book inside the bag?', answer: 'Engineering Mathematics by Stroud' },
    ],
    status: 'pending', createdAt: '2025-05-21T14:00:00Z',
    message: 'This is my bag. I left it near the cafeteria around noon.',
  },
  {
    id: 'claim2', itemId: 'item5', itemTitle: 'MacBook Pro 14" (Space Grey)',
    claimantId: 'user2', claimantName: 'Emeka Obi',
    claimantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
    answers: [
      { question: 'What stickers are on the laptop lid?', answer: 'A UNILAG sticker and a space/NASA sticker' },
      { question: 'What is the name of the laptop?', answer: 'MacBook Pro' },
    ],
    status: 'approved', createdAt: '2025-05-20T10:00:00Z',
  },
];

export const MOCK_CONVERSATIONS = [
  {
    id: 'conv1', participants: ['current', 'user1'],
    participantNames: { current: 'David Adebayo', user1: 'Adaeze Nwosu' },
    participantAvatars: {
      current: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80',
      user1: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&q=80',
    },
    lastMessage: 'Can you come to the Science admin office?',
    lastMessageTime: '2025-05-21T15:00:00Z', unreadCount: 1,
    itemId: 'item2', itemTitle: 'Black Backpack with Laptop Inside',
    itemImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop&q=80',
  },
  {
    id: 'conv2', participants: ['current', 'user2'],
    participantNames: { current: 'David Adebayo', user2: 'Emeka Obi' },
    participantAvatars: {
      current: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80',
      user2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80',
    },
    lastMessage: 'Are the keys still available?',
    lastMessageTime: '2025-05-22T09:00:00Z', unreadCount: 0,
    itemId: 'item4', itemTitle: 'Set of Keys with Red Keychain',
    itemImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop&q=80',
  },
];

export const MOCK_MESSAGES = {
  conv1: [
    {
      id: 'm1', senderId: 'current', senderName: 'David Adebayo',
      receiverId: 'user1', content: 'Hi! I think that backpack belongs to me. I submitted a claim.',
      timestamp: '2025-05-21T13:00:00Z', read: true, itemId: 'item2', itemTitle: 'Black Backpack with Laptop Inside',
    },
    {
      id: 'm2', senderId: 'user1', senderName: 'Adaeze Nwosu',
      senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&q=80',
      receiverId: 'current', content: 'I received your claim! Your answers match well. Can you come to the Science admin office?',
      timestamp: '2025-05-21T15:00:00Z', read: false,
    },
  ],
  conv2: [
    {
      id: 'm3', senderId: 'current', senderName: 'David Adebayo',
      receiverId: 'user2', content: 'Are the keys still available?',
      timestamp: '2025-05-22T09:00:00Z', read: true, itemId: 'item4', itemTitle: 'Set of Keys with Red Keychain',
    },
  ],
};

export const MOCK_NOTIFICATIONS  = [
  {
    id: 'n1', userId: 'current', type: 'claim',
    title: 'Claim approved!', message: 'Your claim for "Black Backpack" has been reviewed.',
    read: false, createdAt: '2025-05-21T15:00:00Z', link: '/items/item2',
  },
  {
    id: 'n2', userId: 'current', type: 'message',
    title: 'New message from Adaeze', message: 'Can you come to the Science admin office?',
    read: false, createdAt: '2025-05-21T15:00:00Z', link: '/messages',
  },
  {
    id: 'n3', userId: 'current', type: 'match',
    title: 'Possible match found!', message: 'A found item matches your lost Samsung Galaxy S23.',
    read: true, createdAt: '2025-05-21T10:00:00Z', link: '/items/item4',
  },
  {
    id: 'n4', userId: 'current', type: 'system',
    title: 'Welcome to UniFind!', message: 'Your account is verified. Report or find lost items now.',
    read: true, createdAt: '2025-05-15T08:00:00Z',
  },
];

export const MOCK_REPORTS = [
  {
    id: 'rep1', reporterId: 'user2', reporterName: 'Emeka Obi',
    targetId: 'item99', targetType: 'item', targetName: 'Suspicious MacBook Listing',
    reason: 'Fake/Spam listing', status: 'pending', createdAt: '2025-05-20T10:00:00Z',
  },
  {
    id: 'rep2', reporterId: 'user3', reporterName: 'Zainab Hassan',
    targetId: 'user99', targetType: 'user', targetName: 'FakeUser123',
    reason: 'False claim submission', status: 'reviewed', createdAt: '2025-05-19T14:00:00Z',
  },
  {
    id: 'rep3', reporterId: 'current', reporterName: 'David Adebayo',
    targetId: 'item88', targetType: 'item', targetName: 'Spam Keys Listing',
    reason: 'Duplicate/Spam', status: 'resolved', createdAt: '2025-05-18T09:00:00Z',
  },
];
