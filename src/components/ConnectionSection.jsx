import React, { useState } from 'react';

const ConnectionSection = () => {
  const [showConnections, setShowConnections] = useState(false);
  const [connections, setConnections] = useState([
    { id: 1, name: 'Rahul Kumar', role: 'Frontend Developer', avatar: '👨‍💻' },
    { id: 2, name: 'Priya Singh', role: 'Full Stack Developer', avatar: '👩‍💻' },
    { id: 3, name: 'Amit Patel', role: 'Backend Developer', avatar: '👨‍💼' },
    { id: 4, name: 'Sneha Sharma', role: 'UI/UX Designer', avatar: '👩‍🎨' },
  ]);

  const [pendingRequests, setPendingRequests] = useState([
    { id: 1, name: 'Arjun Verma', role: 'React Developer', avatar: '👨‍💻' },
    { id: 2, name: 'Zara Khan', role: 'Data Scientist', avatar: '👩‍🔬' },
  ]);

  const acceptConnection = (id) => {
    const connection = pendingRequests.find(c => c.id === id);
    if (connection) {
      setConnections([...connections, connection]);
      setPendingRequests(pendingRequests.filter(c => c.id !== id));
    }
  };

  const declineConnection = (id) => {
    setPendingRequests(pendingRequests.filter(c => c.id !== id));
  };

  const totalConnections = connections.length + pendingRequests.length;

  return (
    <div className="relative">
      <button
        onClick={() => setShowConnections(!showConnections)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
        title="Connections"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-2a6 6 0 0112 0v2zm0 0h6v-2a6 6 0 00-9-5.656" />
        </svg>
        {totalConnections > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full">
            {totalConnections}
          </span>
        )}
      </button>

      {showConnections && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 max-h-96 overflow-y-auto">
          <div className="sticky top-0 p-4 border-b border-gray-200 bg-white">
            <h3 className="font-semibold text-gray-900">Connections</h3>
          </div>

          {/* Pending Requests */}
          {pendingRequests.length > 0 && (
            <div className="border-b border-gray-200">
              <div className="p-4 bg-yellow-50">
                <h4 className="font-semibold text-sm text-gray-700 mb-3">
                  Pending Requests ({pendingRequests.length})
                </h4>
                <div className="space-y-2">
                  {pendingRequests.map((req) => (
                    <div key={req.id} className="flex items-center justify-between p-2 bg-white rounded border border-yellow-200">
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-2xl">{req.avatar}</span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{req.name}</p>
                          <p className="text-xs text-gray-500 truncate">{req.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => acceptConnection(req.id)}
                          className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition"
                        >
                          ✓
                        </button>
                        <button
                          onClick={() => declineConnection(req.id)}
                          className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs rounded transition"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Your Connections */}
          <div className="p-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-3">
              Your Connections ({connections.length})
            </h4>
            {connections.length === 0 ? (
              <p className="text-sm text-gray-500">No connections yet</p>
            ) : (
              <div className="space-y-2">
                {connections.map((conn) => (
                  <div key={conn.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                    <span className="text-2xl">{conn.avatar}</span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">{conn.name}</p>
                      <p className="text-xs text-gray-500 truncate">{conn.role}</p>
                    </div>
                    <button className="text-sm text-gray-500 hover:text-gray-700 flex-shrink-0">
                      📧
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionSection;
