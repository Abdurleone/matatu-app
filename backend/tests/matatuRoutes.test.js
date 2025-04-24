const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server'); // Assuming your app is exported from this file

// Setup test database connection before tests run
beforeAll(async () => {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.connect('mongodb://localhost:27017/matatu_test_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

// Clean up the database after all tests run
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Matatu Routes', () => {
  let matatuId;

  // Test creating a new matatu
  it('should create a new matatu', async () => {
    const response = await request(app)
      .post('/matatus')
      .send({
        registrationNumber: 'ABC123',
        capacity: 30,
        driver: 'driverId',
        conductor: 'conductorId',
        isActive: true
      })
      .expect(201);

    expect(response.body).toHaveProperty('registrationNumber', 'ABC123');
    matatuId = response.body._id; // Store matatuId for future tests
  });

  // Test getting all matatus
  it('should get all matatus', async () => {
    const response = await request(app)
      .get('/matatus')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test getting a single matatu by ID
  it('should get a single matatu', async () => {
    const response = await request(app)
      .get(`/matatus/${matatuId}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', matatuId);
  });

  // Test updating a matatu
  it('should update a matatu', async () => {
    const response = await request(app)
      .put(`/matatus/${matatuId}`)
      .send({
        registrationNumber: 'XYZ456',
        capacity: 35
      })
      .expect(200);

    expect(response.body).toHaveProperty('registrationNumber', 'XYZ456');
    expect(response.body).toHaveProperty('capacity', 35);
  });

  // Test deleting a matatu
  it('should delete a matatu', async () => {
    const response = await request(app)
      .delete(`/matatus/${matatuId}`)
      .expect(200);

    expect(response.body).toHaveProperty('message', 'Matatu deleted');
  });
});