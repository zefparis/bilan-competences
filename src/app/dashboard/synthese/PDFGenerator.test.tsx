import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PDFGenerator } from './PDFGenerator'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock des données utilisateur
const mockUserData = {
  riasecResult: {
    scoreR: 7,
    scoreI: 9,
    scoreA: 5,
    scoreS: 6,
    scoreE: 4,
    scoreC: 3,
    topCode: 'RIS'
  },
  values: [
    { id: '1', valueName: 'Autonomie', order: 1, gapScore: 4 },
    { id: '2', valueName: 'Créativité', order: 2, gapScore: 5 }
  ],
  experiences: [
    {
      id: '1',
      title: 'Développeur Full Stack',
      company: 'Tech Company',
      startDate: new Date('2021-01-01'),
      endDate: new Date('2023-12-31'),
      skills: 'React,Node.js,PostgreSQL'
    }
  ],
  lifePath: {
    events: [
      {
        id: '1',
        year: 2015,
        title: 'Licence Informatique',
        type: 'FORMATION',
        sentiment: 8,
        description: 'Formation en développement logiciel'
      }
    ]
  }
}

// Mock de useSession
jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: { user: { id: '123' } } })
}))

// Mock de fetchUserData
jest.mock('@/lib/prisma', () => ({
  prisma: {
    assessment: {
      findFirst: jest.fn().mockResolvedValue(mockUserData)
    }
  }
}))

describe('PDFGenerator', () => {
  it('should render without crashing', async () => {
    const queryClient = new QueryClient()
    
    render(
      <QueryClientProvider client={queryClient}>
        <PDFGenerator />
      </QueryClientProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Télécharger ma synthèse')).toBeInTheDocument()
    })
  })
})
