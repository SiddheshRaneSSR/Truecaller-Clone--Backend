
const UserProfile = require('../../models/user_model');
const SpamReport = require('../../models/SpamReport_model');
const Contact = require('../../models/contact_model');

// Display details for a person
exports.SearchUser =  async (req, res) => {
  try {
    const personId = req.params.id;
    const loggedInUserId = req.user.id;

    const person = await UserProfile.findByPk(personId, {
      include: [
        {
          model: SpamReport,
          attributes: ['id', 'phone_number'],
        },
      ],
    });

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    const isContact = await Contact.findOne({
      where: { user_id: loggedInUserId, contact_phone_number: person.phone_number },
    });

    let spam_likelihood = 0;

    // Check if the user's phone number is found in SpamReport records
    const userSpamRecord = person.SpamReports.find(spamRecord => spamRecord.phone_number === person.phone_number);
    
    if (userSpamRecord) {
      spam_likelihood = 100; // If the user's phone number is in SpamReport, set spam_likelihood to 100%
    } else {
      // Calculate spam_likelihood as a percentage of the total number of users who marked the phone number as spam
      const totalSpamReports = await SpamReport.count({ where: { phone_number: person.phone_number } });
      const totalUsers = await UserProfile.count();
      
      if (totalUsers > 0) {
        spam_likelihood = (totalSpamReports / totalUsers) * 100;
      }
    }

    const personDetails = {
      id: person.id,
      name: person.name,
      phone_number: person.phone_number,
      email: isContact ? person.email : undefined,
      spam_likelihood: spam_likelihood,
    };

    res.json({ person: personDetails });
  } catch (error) {
    console.error('Error getting person details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
