import React from 'react';

function AboutPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About ExploreRoute</h2>
      
      <p className="mb-4">
        ExploreRoute is a smart web application that generates personalized tour itineraries 
        based on your location, time constraints, and preferred attractions.
      </p>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Project Authors</h3>
        <ul className="list-disc pl-5">
          <li>hh752</li>
          <li>wl758</li>
          <li>gg523</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Key Features</h3>
        <ul className="list-disc pl-5">
          <li>Interactive map for exploring attractions</li>
          <li>Location-based recommendations</li>
          <li>Automatic tour generation based on your preferences</li>
          <li>User authentication to save favorite locations and tours</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;
