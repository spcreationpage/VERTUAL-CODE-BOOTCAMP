import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Play, Code, Database, Server, Globe, Lock, Monitor, Layers, Settings, CheckCircle, BookOpen, Terminal } from 'lucide-react';

const modules = [
  {
    id: 1,
    title: "Introduction to MERN Stack",
    icon: <BookOpen className="w-6 h-6" />,
    description: "Overview of MongoDB, Express.js, React.js, and Node.js ecosystem",
    topics: ["What is MERN Stack", "Architecture Overview", "Development Environment", "Project Structure"],
    completed: false
  },
  {
    id: 2,
    title: "Node.js Fundamentals",
    icon: <Server className="w-6 h-6" />,
    description: "Server-side JavaScript with Node.js and NPM package management",
    topics: ["Node.js Basics", "NPM & Package.json", "Modules & Require", "File System Operations"],
    completed: false
  },
  {
    id: 3,
    title: "Express.js Framework",
    icon: <Globe className="w-6 h-6" />,
    description: "Building RESTful APIs and web applications with Express.js",
    topics: ["Express Setup", "Routing", "Middleware", "Error Handling", "Static Files"],
    completed: false
  },
  {
    id: 4,
    title: "MongoDB & Mongoose",
    icon: <Database className="w-6 h-6" />,
    description: "NoSQL database operations and Object Document Mapping",
    topics: ["MongoDB Basics", "CRUD Operations", "Mongoose ODM", "Schema Design", "Validation"],
    completed: false
  },
  {
    id: 5,
    title: "React.js Fundamentals",
    icon: <Code className="w-6 h-6" />,
    description: "Component-based front-end development with React",
    topics: ["JSX Syntax", "Components", "Props & State", "Event Handling", "Conditional Rendering"],
    completed: false
  },
  {
    id: 6,
    title: "React Hooks & State Management",
    icon: <Layers className="w-6 h-6" />,
    description: "Modern React patterns with hooks and state management",
    topics: ["useState", "useEffect", "useContext", "Custom Hooks", "State Patterns"],
    completed: false
  },
  {
    id: 7,
    title: "API Integration & HTTP Requests",
    icon: <Terminal className="w-6 h-6" />,
    description: "Connecting frontend with backend APIs using Fetch and Axios",
    topics: ["Fetch API", "Axios Library", "Async/Await", "Error Handling", "Loading States"],
    completed: false
  },
  {
    id: 8,
    title: "Authentication & Authorization",
    icon: <Lock className="w-6 h-6" />,
    description: "User authentication with JWT tokens and protected routes",
    topics: ["JWT Tokens", "Login/Register", "Protected Routes", "Password Hashing", "Session Management"],
    completed: false
  },
  {
    id: 9,
    title: "Deployment & Production",
    icon: <Monitor className="w-6 h-6" />,
    description: "Deploying MERN applications to cloud platforms",
    topics: ["Environment Variables", "Build Process", "Heroku Deployment", "MongoDB Atlas", "Performance"],
    completed: false
  },
  {
    id: 10,
    title: "Advanced Topics & Best Practices",
    icon: <Settings className="w-6 h-6" />,
    description: "Advanced concepts and industry best practices",
    topics: ["Testing", "Security", "Optimization", "Code Organization", "CI/CD Pipeline"],
    completed: false
  }
];

function App() {
  const [currentModule, setCurrentModule] = useState(1);
  const [completedModules, setCompletedModules] = useState(new Set());
  const [mongoUrl, setMongoUrl] = useState('');
  const [showMongoSection, setShowMongoSection] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [editorCode, setEditorCode] = useState<string>(`// You can write JavaScript here\n// Example:\n// console.log('Hello Bootcamp');\n\nfunction greet(name) {\n  return 'Hello ' + name + '!';\n}\n\nconsole.log(greet('MERN'));`);
  const [runOutput, setRunOutput] = useState<string>('');

  const currentModuleData = modules.find(m => m.id === currentModule);

  const toggleModuleComplete = (moduleId) => {
    const newCompleted = new Set(completedModules);
    if (newCompleted.has(moduleId)) {
      newCompleted.delete(moduleId);
    } else {
      newCompleted.add(moduleId);
    }
    setCompletedModules(newCompleted);
  };

  const nextModule = () => {
    if (currentModule < modules.length) {
      setCurrentModule(currentModule + 1);
    }
  };

  const prevModule = () => {
    if (currentModule > 1) {
      setCurrentModule(currentModule - 1);
    }
  };

  const progressPercentage = (completedModules.size / modules.length) * 100;

  const exampleSnippets: { title: string; code: string }[] = [
    {
      title: 'Array Map',
      code: `const nums = [1,2,3];\nconsole.log(nums.map(n => n * 2));`,
    },
    {
      title: 'Fetch Example',
      code: `// Note: fetch may be blocked by CORS in dev\nfetch('https://api.github.com').then(r=>r.json()).then(d=>console.log(Object.keys(d))).catch(e=>console.log('Error', e.message));`,
    },
    {
      title: 'Promise/Async',
      code: `async function run(){\n  const value = await Promise.resolve(42);\n  console.log('Value:', value);\n}\nrun();`,
    },
  ];

  const runCodeSafely = () => {
    const logs: string[] = [];
    const originalConsoleLog = console.log;
    try {
      // capture console.log output
      (console as any).log = (...args: unknown[]) => {
        logs.push(args.map(a => {
          try { return typeof a === 'string' ? a : JSON.stringify(a); } catch { return String(a); }
        }).join(' '));
      };
      // eslint-disable-next-line no-new-func
      const fn = new Function(editorCode);
      fn();
      setRunOutput(logs.join('\n'));
    } catch (error) {
      setRunOutput(`Error: ${(error as Error).message}`);
    } finally {
      console.log = originalConsoleLog;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Virtual MERN Stack Bootcamp</h1>
                <p className="text-gray-600">Master MongoDB, Express.js, React.js & Node.js</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <span className="text-lg font-semibold text-gray-700">{Math.round(progressPercentage)}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Module List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-blue-500" />
                Course Modules
              </h2>
              <div className="space-y-2">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    onClick={() => setCurrentModule(module.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center space-x-3 ${
                      currentModule === module.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className={`flex-shrink-0 ${currentModule === module.id ? 'text-white' : 'text-blue-500'}`}>
                      {module.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        Module {module.id}
                      </div>
                      <div className="text-xs opacity-75 truncate">
                        {module.title}
                      </div>
                    </div>
                    {completedModules.has(module.id) && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </button>
                ))}
              </div>
              
              {/* MongoDB Connection Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowMongoSection(!showMongoSection)}
                  className="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">MongoDB Setup</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-green-600 transition-transform ${showMongoSection ? 'rotate-90' : ''}`} />
                </button>
                
                {showMongoSection && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <label className="block text-sm font-medium text-green-800 mb-2">
                      MongoDB Connection URL
                    </label>
                    <input
                      type="text"
                      value={mongoUrl}
                      onChange={(e) => setMongoUrl(e.target.value)}
                      placeholder="mongodb://localhost:27017/bootcamp"
                      className="w-full px-3 py-2 border border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                    <p className="text-xs text-green-600 mt-2">
                      Paste your local MongoDB connection string here
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Module Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      {currentModuleData?.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Module {currentModule}</h2>
                      <h3 className="text-xl opacity-90">{currentModuleData?.title}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleModuleComplete(currentModule)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      completedModules.has(currentModule)
                        ? 'bg-green-500 text-white'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {completedModules.has(currentModule) ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    ) : (
                      'Mark Complete'
                    )}
                  </button>
                </div>
              </div>

              {/* Module Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Module Overview</h4>
                  <p className="text-gray-600 leading-relaxed">{currentModuleData?.description}</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Learning Topics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentModuleData?.topics.map((topic, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                        </div>
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Learning Area */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Play className="w-5 h-5 mr-2 text-green-500" />
                    Interactive Learning Area
                  </h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                    <div className="mb-2">// Module {currentModule}: {currentModuleData?.title}</div>
                    <div className="mb-2">console.log("Welcome to {currentModuleData?.title}");</div>
                    <div className="mb-2">// Practice your coding skills here</div>
                    <div className="text-yellow-400">// Ready to start learning? 🚀</div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button onClick={() => setShowEditor(!showEditor)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>{showEditor ? 'Hide Editor' : 'Start Coding'}</span>
                    </button>
                    <button onClick={() => setShowExamples(!showExamples)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
                      <Code className="w-4 h-4" />
                      <span>{showExamples ? 'Hide Examples' : 'View Examples'}</span>
                    </button>
                  </div>

                  {showEditor && (
                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Editor</label>
                        <textarea
                          value={editorCode}
                          onChange={(e) => setEditorCode(e.target.value)}
                          className="w-full h-56 p-3 border rounded-md font-mono text-sm"
                        />
                        <button onClick={runCodeSafely} className="mt-2 px-3 py-2 bg-gray-900 text-white rounded-md">Run</button>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Output</label>
                        <pre className="w-full h-56 p-3 border rounded-md bg-black text-green-400 overflow-auto">{runOutput || '//'}</pre>
                      </div>
                    </div>
                  )}

                  {showExamples && (
                    <div className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {exampleSnippets.map((ex, idx) => (
                          <button
                            key={idx}
                            className="p-3 bg-white border rounded-lg text-left hover:bg-gray-50"
                            onClick={() => { setEditorCode(ex.code); setShowEditor(true); }}
                          >
                            <div className="text-sm font-semibold">{ex.title}</div>
                            <pre className="mt-1 text-xs text-gray-600 whitespace-pre-wrap">{ex.code}</pre>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevModule}
                    disabled={currentModule === 1}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      currentModule === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Module</span>
                  </button>

                  <div className="text-center">
                    <div className="text-sm text-gray-500">Module Progress</div>
                    <div className="text-lg font-semibold text-gray-700">
                      {currentModule} of {modules.length}
                    </div>
                  </div>

                  <button
                    onClick={nextModule}
                    disabled={currentModule === modules.length}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                      currentModule === modules.length
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <span>Next Module</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{modules.length}</div>
                <div className="text-gray-600">Total Modules</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{completedModules.size}</div>
                <div className="text-gray-600">Completed</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{modules.length - completedModules.size}</div>
                <div className="text-gray-600">Remaining</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Code className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">MERN Stack Bootcamp</span>
          </div>
          <p className="text-gray-400">
            Master full-stack development with MongoDB, Express.js, React.js, and Node.js
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
            <span>• Interactive Learning</span>
            <span>• Hands-on Projects</span>
            <span>• Industry Best Practices</span>
            <span>• Real-world Applications</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;