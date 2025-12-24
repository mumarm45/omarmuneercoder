# Resume Builder Application

A comprehensive resume management application built with featuring a professional resume builder and a personal portfolio page.

## 🎯 Features

### 1. **Home Page** (`/`)
- Beautiful landing page with two main options
- Navigate to Resume Builder or view Muhammad Omar's resume
- Modern gradient design with feature highlights

### 2. **Resume Builder** (`/builder`)
- Create and customize professional resumes
- 4 professional templates (Modern, Professional, Creative, Minimal)
- Dialog-based editing for all sections
- Drag & drop reordering for experience, education, and skills
- Export to PDF or Text format
- Auto-save to localStorage
- Real-time preview

### 3. **Personal Resume** (`/my-resume`)
- Professional portfolio page for Muhammad Omar Muneer
- Dark/Light theme toggle
- Complete professional experience (11+ years)
- Skills showcase with categorized sections
- Education details
- Contact information
- Responsive design

## 🚀 Quick Start

```bash
cd /Users/momarm45/Documents/project/resume-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build
```

## 📁 Project Structure

```
resume-builder/
├── src/
│   ├── pages/                      # Route pages
│   │   ├── ResumeBuilder.jsx      # Resume builder application
│   │   └── MyResume.jsx           # Personal resume page
│   ├── components/
│   │   ├── Header.jsx             # Navigation header
│   │   ├── Sidebar.jsx            # Builder sidebar
│   │   ├── Dialog.jsx             # Modal component
│   │   ├── Dialogs/               # Form dialogs
│   │   └── ResumePreview/         # Resume sections
│   ├── store/
│   │   └── resumeStore.js         # Zustand state
│   ├── utils/                     # Utilities
│   ├── __tests__/                 # Tests
│   ├── App.jsx                    # Main app with routing
│   └── main.jsx
├── public/
│   └── Omar_Muneer_2.jpg         # Profile image
└── ...config files
```

## 🛣️ Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Landing page with navigation options |
| `/builder` | ResumeBuilder | Interactive resume builder |
| `/my-resume` | MyResume | Muhammad Omar's professional resume |

## 🎨 Key Technologies

- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Jest + RTL** - Testing
- **jsPDF** - PDF generation
- **Lucide React** - Icons

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 🎯 Usage

### Creating a Resume

1. Navigate to `/builder` or click "Resume Builder" on home
2. Choose a template
3. Click edit icons to modify sections
4. Use "Add Experience/Education/Skill" buttons
5. Drag & drop to reorder items
6. Download as PDF or Text

### Viewing Muhammad Omar's Resume

1. Navigate to `/my-resume` or click the personal resume card
2. Toggle dark/light theme
3. View complete professional experience
4. Download PDF version

## 📦 New Dependencies

- `react-router-dom` - Client-side routing

## 🔧 Configuration

### Adding Routes

Edit `src/App.jsx`:

```jsx
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/builder" element={<ResumeBuilder />} />
  <Route path="/my-resume" element={<MyResume />} />
  <Route path="/new-route" element={<NewComponent />} />
</Routes>
```

### Updating Personal Resume

Edit `src/pages/MyResume.jsx` to customize:
- Personal information
- Experience entries
- Skills
- Education
- Contact details

## 🎨 Customization

### Home Page
Customize the landing page in `src/App.jsx` (HomePage component)

### Personal Resume Theme
The resume page includes a theme toggle. Colors are defined using Tailwind classes.

### Builder Templates
Add new templates in `src/utils/constants.js`

## 📱 Responsive Design

All pages are fully responsive:
- Mobile-first approach
- Adaptive layouts for tablets and desktops
- Touch-friendly interactions

## 🚀 Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy dist/ folder to your hosting service
```

## 🔗 Navigation

Use React Router's `Link` component for internal navigation:

```jsx
import { Link } from 'react-router-dom';

<Link to="/builder">Go to Builder</Link>
```


✅ **Multi-page Application** - React Router implementation
✅ **Home Page** - Professional landing page
✅ **Personal Resume** - Dedicated portfolio page
✅ **Theme Toggle** - Dark/Light mode for personal resume
✅ **Navigation** - Seamless routing between pages
✅ **Breadcrumbs** - Easy navigation back to home

## 💡 Tips

1. **Builder**: All data auto-saves to localStorage
2. **Personal Resume**: Download PDF feature ready
3. **Theme**: Personal resume remembers theme preference
4. **Mobile**: All pages work perfectly on mobile devices
5. **Testing**: All components have comprehensive tests

## 🐛 Troubleshooting

### Routes not working?
- Ensure `npm install` included `react-router-dom`
- Check that `BrowserRouter` wraps your app in `main.jsx`

### Image not showing?
- Place `Omar_Muneer_2.jpg` in `/public` folder
- Verify image path in `MyResume.jsx`

### Navigation issues?
- Use `Link` from react-router-dom, not `<a>` tags
- Ensure routes are defined in `App.jsx`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit pull request

## 📄 License

MIT License - feel free to use for your own projects!

## 🆘 Support

- Review test examples
- Open GitHub issues
- Contact: mumarm45@gmail.com

---

**Built with ❤️ using React Router, Zustand, and Tailwind CSS**

**Now with multi-page routing and personal resume! 🎉**
