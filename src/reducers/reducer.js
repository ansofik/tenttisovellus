function reducer(state, action) {
  switch (action.type) {

    case 'ADD_EXAM':
      console.log('adding new exam title');
      return {
        ...state,
        exams: [...state.exams, { id: action.payload, name: 'Uusi tentti', published: false }]
      }

    case 'DELETE_EXAM':
      return {
        ...state,
        exams: state.exams.filter(exam => exam.id !== action.payload),
        selectedExam: null
      };

    case 'EXAM_NAME_CHANGED':
      console.log("changing exam name to", action.payload)
      return {
        ...state,
        exams: state.exams.map(exam => exam.id === state.selectedExam.id ? { ...exam, name: action.payload } : exam),
        selectedExam: { ...state.selectedExam, name: action.payload }
      };

    case 'QUESTION_CHANGED':
      console.log('changing question text');
      return {
        ...state,
        selectedExam: {
          ...state.selectedExam,
          questions: state.selectedExam.questions.map(question => question.questionId === action.payload.questionId ? {
            ...question, questionText: action.payload.text
          } : question)
        }
      }

    case 'OPTION_CHANGED':
      return {
        ...state,
        selectedExam: {
          ...state.selectedExam,
          questions: state.selectedExam.questions.map(question => question.questionId === action.payload.questionId ? {
            ...question, options: question.options.map(option => option.optionId === action.payload.optionId ? {
              ...option, optionText: action.payload.text, correct: action.payload.correct
            } : option)
          } : question)
        }
      }

    case 'ADD_QUESTION': {
      return {
        ...state,
        selectedExam: {
          ...state.selectedExam,
          questions: [...state.selectedExam.questions, { questionId: action.payload, questionText: '', options: [] }]
        }
      }
    }

    case 'DELETE_QUESTION':
      return {
        ...state,
        selectedExam: {
          ...state.selectedExam,
          questions: state.selectedExam.questions.filter(question => question.questionId !== action.payload)
        }
      }

    case 'ADD_OPTION':
      return {
        ...state,
        selectedExam: {
          ...state.selectedExam,
          questions: state.selectedExam.questions.map(question => question.questionId === action.payload.questionId ? {
            ...question, options: [...question.options, { optionId: action.payload.optionId, optionText: '', correct: false }]
          } : question)
        }
      }

    case 'DELETE_OPTION':
      return {
        ...state,
        selectedExam: {
          ...state.selectedExam,
          questions: state.selectedExam.questions.map(question => question.questionId === action.payload.questionId ? {
            ...question, options: question.options.filter(option => option.optionId !== action.payload.optionId)
          } : question)
        }
      }

    case 'INIT_DATA':
      console.log("initialize data")
      console.log(action.payload);

      return { ...state, exams: action.payload, initialized: true, save: false };

    case 'SELECTED_EXAM':
      console.log('select exam', action.payload);
      return {
        ...state,
        selectedExam: action.payload
      }

    case 'STORE_USER':
      console.log('user', action.payload)
      return { ...state, user: action.payload }

    case 'LOGOUT':
      console.log('logging out');
      return { ...state, user: null }

    default:
      throw new Error();
  }
}

export default reducer