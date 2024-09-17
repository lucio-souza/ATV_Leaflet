const request=require('supertest');
const app=require('../../index');
const { GenericContainer } = require('testcontainers');
const { Sequelize } = require('sequelize');

describe("testando",()=>{
  let server;
  let container;
  let sequelize;
  let port=8080;
  let idUser;
  let emailUser;

  beforeAll(async () => {
    container = await new GenericContainer('postgres')
      .withEnvironment({ POSTGRES_DB: 'testdb', POSTGRES_USER: 'testuser', POSTGRES_PASSWORD: 'testpass' }) // Definindo env vars
      .withExposedPorts(5432)
      .start();

    const dbHost = container.getHost();
    const dbPort = container.getMappedPort(5432);
    const dbName = 'testdb';
    const dbUsername = 'testuser';
    const dbPassword = 'testpass';

    
    sequelize = new Sequelize(`postgres://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, {
      dialect: 'postgres',
    });

    
    await sequelize.authenticate();
    await sequelize.sync({ force: true });

    server = app.listen(port, () => { 
      console.log(`Servidor online na porta ${port}`);
    });

    const newUser={
      nome:"lucio",
      email:"teste@gmail.com",
      idade:20,
      localizacao:{
        type:"Point",
        coordinates:[123,321]
      }
    }
    const res=await request(app).post('/users').send(newUser).set('Accept', 'application/json');
    idUser=res.body.id;
    emailUser=res.body.email;
  }, 60000); 

  afterAll(async () => {
    if (server) {
      server.close(() => {
        console.log("Servidor encerrado");
      });
    }
    if (sequelize) {
      await sequelize.close();
    }
    if (container) {
      await container.stop();
    }
  });

  it('Endpoint Post',async()=>{
    const newUser={
      nome:"lucio",
      email:"teste@gmail.com",
      idade:20,
      localizacao:{
        type:"Point",
        coordinates:[123,321]
      }
    }
    const res=await request(app).post('/users').send(newUser).set('Accept', 'application/json');
    expect(res.statusCode).toBe(404);
  },10000)
    
  it('endpoint GetAll', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
  },10000);

  it('endpoint GetByemail',async()=>{
    const res = await request(app).get(`/users/${emailUser}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome','lucio');
    expect(res.body).toHaveProperty('email','teste@gmail.com');
    expect(res.body).toHaveProperty('idade',20);
    expect(res.body.localizacao).toEqual(expect.objectContaining({
      type: "Point",
      coordinates: expect.arrayContaining([123, 321])
    }));
  })

  it('endpoint update',async ()=>{
    const userAtualizado={
      nome:"leivas",
      idade:28,
      localizacao:{
        type:"Point",
        coordinates:[321,123]
      }
    }

    const res = await request(app).put(`/users/${idUser}`).send(userAtualizado).set('Accept', 'application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('nome', 'leivas');
    expect(res.body).toHaveProperty('idade', 28); 
    expect(res.body.localizacao.type).toBe("Point");
    expect(res.body.localizacao.coordinates[0]).toBe(321);
    expect(res.body.localizacao.coordinates[1]).toBe(123);
  })

  it('endpoint delete',async ()=>{
    const res=await request(app).delete(`/users/${idUser}`)
    expect(res.statusCode).toBe(200);
  })
});