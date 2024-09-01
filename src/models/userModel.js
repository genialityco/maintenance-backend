import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  servicesTaken: {
    type: Number,
    default: 0,
  },
  referralsMade: {
    type: Number,
    default: 0,
  },
  hasServiceDiscount: {
    type: Boolean,
    default: false,
  },
  serviceDiscountDetails: {
    type: String,
    default: '',
  },
  hasReferralBenefit: {
    type: Boolean,
    default: false,
  },
  referralBenefitDetails: {
    type: String,
    default: '',
  },
}, {
  timestamps: true
});

// Método para incrementar los servicios tomados
userSchema.methods.incrementServices = function() {
  this.servicesTaken += 1;

  // Otorgar un descuento por cada 7 servicios tomados
  if (this.servicesTaken % 7 === 0) {
    this.hasServiceDiscount = true;
    this.serviceDiscountDetails = 'Descuento especial por 7 servicios tomados';
  } else {
    this.hasServiceDiscount = false;
    this.serviceDiscountDetails = '';
  }

  return this.save();
};

// Método para incrementar los referidos realizados
userSchema.methods.incrementReferrals = function() {
  this.referralsMade += 1;
  this.servicesTaken += 1; // Cada referido cuenta también como un servicio

  // Otorgar un beneficio por cada 5 referidos realizados
  if (this.referralsMade % 5 === 0) {
    this.hasReferralBenefit = true;
    this.referralBenefitDetails = 'Beneficio especial por 5 referidos realizados';
  } else {
    this.hasReferralBenefit = false;
    this.referralBenefitDetails = '';
  }

  // También revisar si los servicios tomados alcanzan un múltiplo de 7
  if (this.servicesTaken % 7 === 0) {
    this.hasServiceDiscount = true;
    this.serviceDiscountDetails = 'Descuento especial por 7 servicios tomados';
  } else {
    this.hasServiceDiscount = false;
    this.serviceDiscountDetails = '';
  }

  return this.save();
};

const User = mongoose.model('User', userSchema);

export default User;
