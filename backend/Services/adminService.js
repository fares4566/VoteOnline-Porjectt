const User = require('../models/user');
const Sondage = require('../models/sondage');
const Option = require('../models/option');
const getUsers = async () => {
  const users = await User.find({ role: 'user' }); 


  for (let user of users) {
    const sondageCount = await Sondage.countDocuments({ user: user._id });
    const lastSondage = await Sondage.findOne({ user: user._id }).sort({ createdAt: -1 });
    if (lastSondage) {
      user.lastSondage = new Date(lastSondage.dateCreation).toLocaleDateString('en-US', {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long',   
        day: 'numeric',  
      });
    } else {
      user.lastSondage = "None";
    }

    user.sondageCount = sondageCount; 
  }

  return  users;
};

const getUserStats = async () => {
  try {
    const totalUsers = await User.countDocuments();

    const totalSondages = await Sondage.countDocuments();

    const avgSondageParUser = totalUsers > 0 ? totalSondages / totalUsers : 0;

    return {
      totalUsers,
      avgSondageParUser: avgSondageParUser.toFixed(2) 
    };
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error;
  }
};

const getSondages = async () => {
  return await Sondage.find().populate('user');
};
const getSondageStats = async () => {
  const totalSondages = await Sondage.countDocuments();

  const closedSondages = await Sondage.countDocuments({ statut: 'closed' });

  const openSondages = await Sondage.countDocuments({ statut: 'open' });

  const sondages = await Sondage.find().populate('options');
  let totalVotes = 0;
  let totalSondageWithVotes = 0;

  sondages.forEach((sondage) => {
    const votesForSondage = sondage.options.reduce((sum, option) => sum + option.votes, 0);
    if (votesForSondage > 0) {
      totalVotes += votesForSondage;
      totalSondageWithVotes++;
    }
  });

  const averageVotes = totalSondageWithVotes > 0 ? (totalVotes / totalSondageWithVotes).toFixed(2) : 0;

  return {
    totalSondages,
    closedSondages,
    openSondages,
    averageVotes,
  };
};

const deleteSondage = async (id) => {
  const sondage = await Sondage.findByIdAndDelete(id);
  return sondage; 
};
const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return null; 
    }

    const sondages = await Sondage.find({ user: user._id })
      .populate({
        path: 'options',  
        model: 'Option',   
        select: 'libelle votes' 
      })
      .exec();  
    return { user, sondages };
  } catch (error) {
    console.error('Error fetching user or sondages:', error);
    throw error;
  }
};






module.exports = {
  getUsers,
  getSondages,
  deleteSondage,
  getUserById,
  getSondageStats,
  getUserStats
};
