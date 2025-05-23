// src/utils/access-api.js - to be added to your existing api.js
import axios from 'axios';

// Simulate API call for development
const simulateApiCall = (response, delay = 600) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ data: response });
    }, delay);
  });
};

// Current date for generating creation dates
const currentDate = new Date();
const getRandomCreationDate = (index) => {
  const daysAgo = 2 + (index * 7) % 60;  // Create a range of dates
  const date = new Date(currentDate);
  date.setDate(currentDate.getDate() - daysAgo);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD format
};

// Access Management API
export const accessManagementApi = {
  // Get all access levels
  getAccessLevels: () => simulateApiCall({
    levels: [
      { id: 6, name: "Access Level 6", flows: ["item-1", "item-2", "item-3", "item-4"] },
      { id: 5, name: "Access Level 5", flows: ["item-5", "item-6"] },
      { id: 4, name: "Access Level 4", flows: ["item-7"] },
      { id: 3, name: "Access Level 3", flows: ["item-8"] },
      { id: 2, name: "Access Level 2", flows: ["item-9"] },
      { id: 1, name: "Access Level 1", flows: ["item-10"]}
    ]
  }),
  
  // Get all flows
  getAllFlows: () => simulateApiCall([
    {
      id: 'item-1',
      name: 'Read Aptos Balance',
      description: 'Data cleaner Pro is the only one stop solution for all your data cleaning needs.',
      icon: 'A',
      accessLevel: 6,
      creationDate: getRandomCreationDate(0),
      owner: "John Doe",
      coOwner: "Jane Smith"
    },
    {
      id: 'item-2',
      name: 'X-Twitter Post API',
      description: 'Data cleaner Pro is the only one stop solution for all your data cleaning needs.',
      icon: 'A',
      accessLevel: 6,
      creationDate: getRandomCreationDate(1),
      owner: "John Doe",
      coOwner: "Jane Smith"
    },
    {
      id: 'item-3',
      name: 'Image Classifier',
      description: 'Data cleaner Pro is the only one stop solution for all your data cleaning needs.',
      icon: 'A',
      accessLevel: 6,
      creationDate: getRandomCreationDate(2),
      owner: "John Doe",
      coOwner: "Jane Smith"
    },
    {
      id: 'item-4',
      name: 'Text Summarizer',
      description: 'Data cleaner Pro is the only one stop solution for all your data cleaning needs.',
      icon: 'A',
      accessLevel: 6,
      creationDate: getRandomCreationDate(3),
      owner: "John Doe",
      coOwner: "Jane Smith"
    },
    {
      id: 'item-5',
      name: 'Gaussian Integral',
      description: 'Advanced mathematical analysis tool for complex calculations.',
      icon: 'G',
      accessLevel: 5,
      creationDate: getRandomCreationDate(4),
      owner: "Jane Smith",
      coOwner: "John Doe"
    },
    {
      id: 'item-6',
      name: 'SQL Connector',
      description: 'Connect to and query SQL databases directly.',
      icon: 'S',
      accessLevel: 5,
      creationDate: getRandomCreationDate(5),
      owner: "Jane Smith",
      coOwner: null
    },
    {
      id: 'item-7',
      name: 'Neural Network',
      description: 'Build and train neural networks with a simple interface.',
      icon: 'N',
      accessLevel: 4,
      creationDate: getRandomCreationDate(6),
      owner: "John Doe",
      coOwner: null
    },
    {
      id: 'item-8',
      name: 'Feature Extractor',
      description: 'Extract features from text, images, and more.',
      icon: 'F',
      accessLevel: 3,
      creationDate: getRandomCreationDate(7),
      owner: "John Doe",
      coOwner: "Jane Smith"
    },
    {
      id: 'item-9',
      name: 'Data Visualizer',
      description: 'Create beautiful visualizations of your data.',
      icon: 'D',
      accessLevel: 2,
      creationDate: getRandomCreationDate(8),
      owner: "Jane Smith",
      coOwner: null
    },
    {
      id: 'item-10',
      name: 'Basic Calculator',
      description: 'Simple calculator for basic operations.',
      icon: 'C',
      accessLevel: 1,
      creationDate: getRandomCreationDate(9),
      owner: "John Doe",
      coOwner: null
    }
  ]),
  
  // Get details about a specific flow's access
  getFlowAccess: (flowId) => simulateApiCall({
    id: flowId,
    name: "Data Cleaner Pro",
    creationDate: "2025-02-10",
    owner: "John Doe",
    coOwner: "Jane Smith",
    accessLevel: 6,
    usersWithAccess: 15,
    addresses: [
      { address: "0x43AD...6612", level: 6 },
      { address: "0xcb6d...2912", level: 6 },
      { address: "0x87FE...1234", level: 5 },
      { address: "0x34AB...9876", level: 4 }
    ]
  }),
  
  // Update access for a flow
  updateFlowAccess: (flowId, data) => simulateApiCall({ 
    success: true, 
    message: "Access updated successfully" 
  }, 1000),
  
  // Add a new address to a flow
  addAddressToFlow: (flowId, address, level) => simulateApiCall({
    success: true,
    message: "Address added successfully"
  }, 1000),
  
  // Remove an address from a flow
  removeAddressFromFlow: (flowId, address) => simulateApiCall({
    success: true,
    message: "Address removed successfully"
  }, 1000)
};