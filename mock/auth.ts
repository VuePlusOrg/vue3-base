export default [
  {
    url: '/auth/login',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: null,
        data: {
          userName: 'Mathon',
          userId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
          gender: 0,
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik1hdGhvbiIsInVzZXJJZCI6IjFiOWQ2YmNkLWJiZmQtNGIyZC05YjVkLWFiOGRmYmJkNGJlZCIsImdlbmRlciI6MH0.OUmLW2Be7oZX1BUQlHXymGRlHDYOSeGSjAG-tRzKib4'
        }
      }
    }
  }
]
