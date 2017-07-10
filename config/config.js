var env = process.env.NODE_ENV || 'development';

if(env === 'development'){
  process.env.PORT = 3050;
  process.env.MONGODB_URI = 'mongodb://localhost/kuber';
}else if(env === 'test'){
  process.env.PORT = 3050;
  process.env.MONGODB_URI = 'mongodb://localhost/kuber_test';
}