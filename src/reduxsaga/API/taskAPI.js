import firebaseConfig from '../../firebase/firebaseConfig';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  setDoc,
  where,
  query,
  orderBy,
  Timestamp
} from "firebase/firestore";

const { firebase_db, firebase_auth } = firebaseConfig;

// Helper function to serialize Firestore documents
const serializeDoc = (doc) => {
  const data = doc.data();
  const result = { ...data, id: doc.id };
  
  // Convert all Timestamp fields to ISO strings
  Object.keys(result).forEach(key => {
    if (result[key] && typeof result[key] === 'object' && result[key].toDate instanceof Function) {
      result[key] = result[key].toDate().toISOString();
    }
  });
  
  return result;
};

// Get auth token for API requests
const getAuthToken = async () => {
  const user = firebase_auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  throw new Error('User not authenticated');
};

// Get today's tasks
export const getDailyTasks = async () => {
  try {
    const userID = firebase_auth.currentUser.uid;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfDay = Timestamp.fromDate(today);
    const endOfDay = Timestamp.fromDate(new Date(today.getTime() + 24 * 60 * 60 * 1000));

    const taskCol = collection(firebase_db, 'tasks');
    const q = query(
      taskCol,
      where('userID', '==', userID),
      where('dateTime', '>=', startOfDay),
      where('dateTime', '<', endOfDay),
      orderBy('dateTime')
    );

    const taskSnapshot = await getDocs(q);
    const taskList = taskSnapshot.docs.map(doc => serializeDoc(doc));
    
    return { data: taskList };
  } catch (error) {
    console.error('Error fetching today\'s tasks:', error);
    return { data: [], error: error.message };
  }
};

// Get weekly tasks
export const getWeeklyTasks = async () => {
  try {
    const userID = firebase_auth.currentUser.uid;
    
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1)));
    const endOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));

    const startOfWeekTimestamp = Timestamp.fromDate(new Date(startOfWeek.setHours(0, 0, 0, 0)));
    const endOfWeekTimestamp = Timestamp.fromDate(new Date(endOfWeek.setHours(23, 59, 59, 999)));

    const taskCol = collection(firebase_db, 'tasks');
    const q = query(
      taskCol,
      where('userID', '==', userID),
      where('dateTime', '>=', startOfWeekTimestamp),
      where('dateTime', '<=', endOfWeekTimestamp),
      orderBy('dateTime', 'desc')
    );

    const taskSnapshot = await getDocs(q);
    const tasks = taskSnapshot.docs.map(doc => serializeDoc(doc));

    // Group tasks by date
    const groupedTasks = tasks.reduce((grouped, task) => {
      const date = task.dateTime.split('T')[0]; // Use the ISO string date part
      const existingGroup = grouped.find(group => group.title === date);
      if (!existingGroup) {
        grouped.push({ title: date, data: [task] });
      } else {
        existingGroup.data.push(task);
      }
      return grouped;
    }, []);

    return { data: groupedTasks };
  } catch (error) {
    console.error('Error fetching weekly tasks:', error);
    return { data: [], error: error.message };
  }
};

// Get monthly tasks
export const getMonthlyTasks = async () => {
  try {
    const userID = firebase_auth.currentUser.uid;
    
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const startOfMonthTimestamp = Timestamp.fromDate(new Date(startOfMonth.setHours(0, 0, 0, 0)));
    const endOfMonthTimestamp = Timestamp.fromDate(new Date(endOfMonth.setHours(23, 59, 59, 999)));

    const taskCol = collection(firebase_db, 'tasks');
    const q = query(
      taskCol,
      where('userID', '==', userID),
      where('dateTime', '>=', startOfMonthTimestamp),
      where('dateTime', '<=', endOfMonthTimestamp),
      orderBy('dateTime', 'desc')
    );

    const taskSnapshot = await getDocs(q);
    const tasks = taskSnapshot.docs.map(doc => serializeDoc(doc));

    // Group tasks by date
    const groupedTasks = tasks.reduce((grouped, task) => {
      const date = task.dateTime.split('T')[0]; // Use the ISO string date part
      const existingGroup = grouped.find(group => group.title === date);
      if (!existingGroup) {
        grouped.push({ title: date, data: [task] });
      } else {
        existingGroup.data.push(task);
      }
      return grouped;
    }, []);

    return { data: groupedTasks };
  } catch (error) {
    console.error('Error fetching monthly tasks:', error);
    return { data: [], error: error.message };
  }
};

// Get important tasks
export const getImportantTasks = async () => {
  try {
    const userID = firebase_auth.currentUser.uid;

    const taskCol = collection(firebase_db, 'tasks');
    const q = query(
      taskCol,
      where('userID', '==', userID),
      where('starred', '==', true),
      orderBy('dateTime', 'desc')
    );

    const taskSnapshot = await getDocs(q);
    const taskList = taskSnapshot.docs.map(doc => serializeDoc(doc));
    
    return { data: taskList };
  } catch (error) {
    console.error('Error fetching important tasks:', error);
    return { data: [], error: error.message };
  }
};

// Get done/completed tasks
export const getDoneTasks = async () => {
  try {
    const userID = firebase_auth.currentUser.uid;

    const taskCol = collection(firebase_db, 'tasks');
    const q = query(
      taskCol,
      where('userID', '==', userID),
      where('status', '==', 'Done'),
      orderBy('dateTime', 'desc')
    );

    const taskSnapshot = await getDocs(q);
    const taskList = taskSnapshot.docs.map(doc => serializeDoc(doc));
    
    return { data: taskList };
  } catch (error) {
    console.error('Error fetching completed tasks:', error);
    return { data: [], error: error.message };
  }
};

// Get later tasks
export const getLaterTasks = async () => {
  try {
    const userID = firebase_auth.currentUser.uid;

    const taskCol = collection(firebase_db, 'tasks');
    const q = query(
      taskCol,
      where('userID', '==', userID),
      where('status', '==', 'Later'),
      orderBy('dateTime', 'desc')
    );

    const taskSnapshot = await getDocs(q);
    const taskList = taskSnapshot.docs.map(doc => serializeDoc(doc));
    
    return { data: taskList };
  } catch (error) {
    console.error('Error fetching later tasks:', error);
    return { data: [], error: error.message };
  }
};

// Create new task
export const createTask = async (taskData) => {
  try {
    const userID = firebase_auth.currentUser.uid;
    
    // Add userID to task
    taskData.userID = userID;

    // Parse date and time
    const dateTimeParts = taskData.date.split('||');
    if (dateTimeParts.length !== 2) {
      throw new Error('Date format should be "DD-MM-YYYY || HH:MM"');
    }

    const [datePart, timePart] = dateTimeParts.map(part => part.trim());
    const [day, month, year] = datePart.split('-');
    const [hour, minute] = timePart.split(':');

    const dateTime = new Date(year, Number(month) - 1, Number(day), hour, minute);
    
    // Set date-related fields
    taskData.dateTime = Timestamp.fromDate(dateTime);
    taskData.date = datePart;
    taskData.time = timePart;
    taskData.created = Timestamp.now();

    // Add task to Firestore
    const docRef = await addDoc(collection(firebase_db, 'tasks'), taskData);

    // Update document with its ID
    const updatedData = { ...taskData, id: docRef.id };
    await setDoc(docRef, updatedData);

    // Return serialized task data
    return { 
      success: true, 
      id: docRef.id, 
      task: serializeDoc({ 
        data: () => updatedData,
        id: docRef.id
      }) 
    };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, error: error.message };
  }
};

// Update task
export const updateTask = async (taskId, taskData) => {
  try {
    const userID = firebase_auth.currentUser.uid;

    // Check if the task belongs to the user
    const docRef = doc(firebase_db, 'tasks', taskId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Task not found');
    }

    const existingTask = docSnap.data();
    if (existingTask.userID !== userID) {
      throw new Error('Unauthorized: Task does not belong to this user');
    }

    // Handle dateTime conversion if necessary
    if (taskData.date && taskData.time) {
      const [day, month, year] = taskData.date.split('-');
      const [hour, minute] = taskData.time.split(':');
      const dateTime = new Date(year, Number(month) - 1, Number(day), hour, minute);
      taskData.dateTime = Timestamp.fromDate(dateTime);
    }

    // Add updated timestamp
    taskData.updated = Timestamp.now();

    // Update task in Firestore
    await updateDoc(docRef, taskData);

    // Get updated document
    const updatedDoc = await getDoc(docRef);
    
    return { 
      success: true, 
      id: taskId,
      task: serializeDoc(updatedDoc)
    };
  } catch (error) {
    console.error('Error updating task:', error);
    return { success: false, error: error.message };
  }
};

// Delete task
export const deleteTask = async (taskId) => {
  try {
    const userID = firebase_auth.currentUser.uid;

    // Check if the task belongs to the user
    const docRef = doc(firebase_db, 'tasks', taskId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Task not found');
    }

    const taskData = docSnap.data();
    if (taskData.userID !== userID) {
      throw new Error('Unauthorized: Task does not belong to this user');
    }

    // Delete task from Firestore
    await deleteDoc(docRef);

    return { success: true, id: taskId };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { success: false, error: error.message };
  }
};

// Mark task as done
export const markTaskAsDone = async (taskId) => {
  try {
    return await updateTask(taskId, { status: 'Done' });
  } catch (error) {
    console.error('Error marking task as done:', error);
    return { success: false, error: error.message };
  }
};

// Mark task for later
export const markTaskForLater = async (taskId) => {
  try {
    return await updateTask(taskId, { status: 'Later' });
  } catch (error) {
    console.error('Error marking task for later:', error);
    return { success: false, error: error.message };
  }
};

// Get task by ID
export const getTaskById = async (taskId) => {
  try {
    const userID = firebase_auth.currentUser.uid;

    // Get task from Firestore
    const docRef = doc(firebase_db, 'tasks', taskId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('Task not found');
    }

    const taskData = docSnap.data();

    // Check if the task belongs to the user
    if (taskData.userID !== userID) {
      throw new Error('Unauthorized: Task does not belong to this user');
    }

    return { 
      success: true, 
      task: serializeDoc(docSnap) 
    };
  } catch (error) {
    console.error('Error fetching task:', error);
    return { success: false, error: error.message };
  }
};