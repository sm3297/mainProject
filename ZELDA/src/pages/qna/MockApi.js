const API_URL = "https://693868724618a71d77d02e81.mockapi.io/QAusers";

export const getAllQuestions = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch questions.');
    }
    const data = await response.json();

    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) || b.id - a.id);
    return data;
  } catch (error) {
    console.error("Error in getAllQuestions:", error);
    return []; 
  }
};

export const addQuestion = async (questionData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionData),
    });
    if (!response.ok) {
      throw new Error('Failed to add question.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error in addQuestion:", error);
    throw error; 
  }
};

export const deleteQuestion = async (questionId) => {
  try {
    const response = await fetch(`${API_URL}/${questionId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete question.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error in deleteQuestion:", error);
    throw error; 
  }
};