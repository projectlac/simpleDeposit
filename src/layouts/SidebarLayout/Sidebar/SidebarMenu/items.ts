import BurstModeIcon from '@mui/icons-material/BurstMode';
import ClassIcon from '@mui/icons-material/Class';
import CollectionsIcon from '@mui/icons-material/Collections';
import QuizIcon from '@mui/icons-material/Quiz';
import { ReactNode } from 'react';
export interface ChildItem {
  name: string;
  link: string;
}
export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
  role?: string;
}

export interface MenuItems {
  items: MenuItem[];
}

const menuItems: MenuItems[] = [
  {
    items: [
      {
        name: 'Banner',
        link: `${process.env.REACT_APP_BASE_NAME}/banner`,
        icon: BurstModeIcon
      },
      {
        name: 'Categories',
        icon: ClassIcon,
        link: `${process.env.REACT_APP_BASE_NAME}/categories`
      },
      {
        name: 'Collections',
        icon: CollectionsIcon,
        link: `${process.env.REACT_APP_BASE_NAME}/collections`,
        items: [
          {
            name: 'Special Collections',
            link: `${process.env.REACT_APP_BASE_NAME}/collections/special-collections`
          },
          {
            name: 'Collection Items',
            link: `${process.env.REACT_APP_BASE_NAME}/collections/item`
          }
        ]
      },

      {
        name: 'FAQs',
        icon: QuizIcon,
        link: `${process.env.REACT_APP_BASE_NAME}/faqs`
      }
    ]
  }
];

export default menuItems;
