
import BankingCredential from '../models/bankingCredential.js'

export const addBankingCredential = async (req, res) => {
    const {userId} = req.user
    const {bankName, accountNumber, accountType, username, password, ifscCode, branchName, notes} = req.body
  try {
    const newCredential = new BankingCredential({
      userId,
      bankName,
      accountNumber,
      accountType,
      username, 
      password,// Includes bankName, accountNumber, etc.
      ifscCode,
      branchName,
      notes
    });
    await newCredential.save();
    return res.status(201).json({ success: true, message: "Banking Credential added successfully" })
    //return newCredential;
  } catch (error) {
    console.error('Error adding Banking Credential:', error);
    throw error;
  }
};


export const getCredentials = async (req, res) => {
  console.log(req.user.userId);  
try {
  const credential = await BankingCredential.find({ userId: req.user.userId });
  if(!credential){
  return res.status(404).json({ success: false, message: "Banking Credential not found" })
  }
  else
  {
  return res.status(200).json({ success: true, message: "Banking Credential", credential })
  }
} catch (error) {
  console.error('Error fiding Banking Credential:', error);
  throw error;
}
};



export const updateCredentials = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Find and update the credential in your database
    const updatedCredential = await BankingCredential.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedCredential) {
      return res.status(404).json({ success: false, message: 'Credential not found' });
    }

    res.status(200).json({ success: true, credential: updatedCredential });
  } catch (error) {
    console.error('Error updating credential:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};




export const deleteCredentials = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCredential = await BankingCredential.findByIdAndDelete(id);
    if (!deletedCredential) {
      return res.status(404).json({ success: false, message: 'Credential not found' });
    }

    res.status(200).json({ success: true, message: 'Credential deleted successfully' });
  } catch (error) {
    //console.error('Error deleting credential:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

 