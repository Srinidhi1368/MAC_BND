const User = require('../../model/users/UserModel')

const getJobApplicationAnalytics = async (req, res) => {
    try {
      const { email } = req.query;
  
      const allMonths = Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        monthName: new Date(2000, i, 1).toLocaleString('en-US', { month: 'short' }),
      }));
  
      // Perform aggregation to count job applications for each month
      const analyticsData = await User.aggregate([
        { $match: { email } },
        { $unwind: "$userAppliedJob" },
        {
          $group: {
            _id: { month: { $month: "$userAppliedJob.appliedAt" } },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            month: {
              $dateToString: {
                format: "%B",
                date: { $dateFromParts: { month: "$_id.month", day: 1, year: 2000 } },
              },
            },
            jobApplications: "$count",
          },
        },
      ]);
  
      // Merge the aggregation result with all months to ensure all months are represented
      const mergedData = allMonths.map(({ month, monthName }) => {
        const match = analyticsData.find(data => data.month === monthName);
        return {
          month: monthName,
          jobApplications: match ? match.jobApplications : 0,
        };
      });
  
      res.json(mergedData);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
module.exports = { getJobApplicationAnalytics };
