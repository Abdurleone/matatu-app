const request = require('supertest');
const app = require('../server'); // Ensure this is the path to your Express app
const mongoose = require('mongoose');
const Matatu = require('../models/Matatu');

// Setup test database connection before tests run
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/matatu_test_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Clear the database before each test to avoid data contamination
beforeEach(async () => {
  await Matatu.deleteMany();
});

// Close the database connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Matatu Routes', () => {
  let matatuId;

  // Test for creating a matatu
  it('should create a new matatu', async () => {
    const newMatatu = {
      registrationNumber: 'ABC123',
      capacity: 33,
      driver: 'D123',
      conductor: 'C456',
      isActive: true,
    };

    const response = await request(app)
      .post('/matatus')
      .send(newMatatu)
      .expect(201); // Expect status code 201 (Created)

    matatuId = response.body._id; // Store the matatu ID for further tests

    expect(response.body.registrationNumber).toBe(newMatatu.registrationNumber);
    expect(response.body.capacity).toBe(newMatatu.capacity);
    expect(response.body.isActive).toBe(newMatatu.isActive);
  });

  // Test for getting all matatus
  it('should fetch all matatus', async () => {
    const response = await request(app).get('/matatus').expect(200); // Expect status code 200

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1); // Should have at least one matatu
  });

  // Test for getting a matatu by ID
  it('should fetch a matatu by ID', async () => {
    const response = await request(app)
      .get(`/matatus/${matatuId}`)
      .expect(200); // Expect status code 200

    expect(response.body._id).toBe(matatuId);
    expect(response.body.registrationNumber).toBe('ABC123');
  });

  // Test for updating a matatu by ID
  it('should update a matatu by ID', async () => {
    const updatedMatatu = {
      registrationNumber: 'XYZ789',
      capacity: 35,
      isActive: false,
    };

    const response = await request(app)
      .put(`/matatus/${matatuId}`)
      .send(updatedMatatu)
      .expect(200); // Expect status code 200

    expect(response.body.registrationNumber).toBe(updatedMatatu.registrationNumber);
    expect(response.body.capacity).toBe(updatedMatatu.capacity);
    expect(response.body.isActive).toBe(updatedMatatu.isActive);
  });

  // Test for deleting a matatu by ID
  it('should delete a matatu by ID', async () => {
    const response = await request(app)
      .delete(`/matatus/${matatuId}`)
      .expect(200); // Expect status code 200

    expect(response.body.message).toBe('Matatu deleted');
  });
});