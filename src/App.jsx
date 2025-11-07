import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

function App() {
  const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

  return (
    <Container className='bg-warning my-3 p-3'>
      <Row>
        <Col md={6} className='mb-3 mb-md-0'>
          <Button variant='primary' className='w-100'>Hello</Button>
        </Col>
        <Col md={6}>
          <Button variant='danger' className='w-100'>World</Button>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} className='d-flex align-items-stretch mt-3'>
        <Col className='mb-3 mb-lg-0 d-flex align-items-stretch'>
          <Card>
            <Card.Img variant="top" src='https://placehold.co/700x500' />
            <Card.Body className='d-flex flex-column'>
              <Card.Title>Card title</Card.Title>
              <Card.Text className='flex-grow-1'>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <div className='d-flex justify-content-end'>
                <Button variant='primary'>Go somewhere</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className='mb-3 mb-lg-0 d-flex align-items-stretch'>
          <Card>
            <Card.Img variant="top" src='https://placehold.co/700x500' />
            <Card.Body className='d-flex flex-column'>
              <Card.Title>Card title</Card.Title>
              <Card.Text className='flex-grow-1'>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis animi quae, aut itaque facere in! Rerum voluptates debitis explicabo officiis, quia praesentium consequatur libero, nemo architecto quisquam facilis tempore soluta?
              </Card.Text>
              <div className='d-flex justify-content-end'>
                <Button variant='primary'>Go somewhere</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className='d-flex align-items-stretch'>
          <Card>
            <Card.Img variant="top" src='https://placehold.co/700x500' />
            <Card.Body className='d-flex flex-column'>
              <Card.Title>Card title</Card.Title>
              <Card.Text className='flex-grow-1'>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <div className='d-flex justify-content-end'>
                <Button variant='primary'>Go somewhere</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default App
