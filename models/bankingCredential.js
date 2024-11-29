
import mongoose from 'mongoose';

const bankingCredentialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: String, enum: ['Savings', 'Current', 'Other'], required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  ifscCode: { type: String, required: true },
  branchName: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const BankingCredential = mongoose.model('BankingCredential', bankingCredentialSchema);

export default BankingCredential;
