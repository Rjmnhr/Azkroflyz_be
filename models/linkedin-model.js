const pool = require("../mySQL-DB");

const LinkedinModel = {
  getData: async (getData) => {
    const connection = await pool.getConnection();
    const {
      current_title,
      desired_title,
      ug_degree,
      additional_degree,
      ug_tier,
      experience,
    } = getData;

    try {
      let query = `  SELECT
      (SELECT COUNT(*) FROM Linkedin_data
      WHERE '${current_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)) 
      AS row_counts_current_title,
      (SELECT COUNT(*) FROM Linkedin_data
      WHERE '${desired_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)) 
      AS row_counts_desired_title,
      (SELECT COUNT(*) FROM Linkedin_data
      WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
      AS row_counts_ug_degree,
      (SELECT COUNT(*) FROM Linkedin_data
      WHERE '${additional_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
      AS row_counts_additional_degree,
      (SELECT COUNT(*) FROM Linkedin_data
      WHERE '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)) 
      AS row_counts_ug_tier,
      (SELECT COUNT(*) FROM Linkedin_data
      WHERE '${experience}' IN (job_0_duration, job_1_duration,job_2_duration, job_3_duration, job_4_duration, job_5_duration,  job_6_duration, job_7_duration)) 
      AS row_counts_experience,
      (SELECT COUNT(*) FROM Linkedin_data
       WHERE '${current_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)
       AND '${desired_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)) 
       AS row_counts_desired_and_current_title,
      (SELECT COUNT(*) FROM Linkedin_data 
       WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
       AND '${additional_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)) 
       AS row_counts_ug_and_add_title,
       (SELECT COUNT(*) FROM Linkedin_data 
       WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
       AND '${ug_tier}' IN (tier_mapping_institute_0, tier_mapping_institute_1,tier_mapping_institute_2, tier_mapping_institute_3)) 
       AS row_counts_ug_degree_and_ug_tier,
       (SELECT COUNT(*) FROM Linkedin_data 
       WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
       AND  '${current_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)
       AND '${desired_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)) 
       AS row_counts_ug_degree_and_current_and_desired_title,
       (SELECT COUNT(*) FROM Linkedin_data 
       WHERE '${ug_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
       AND '${additional_degree}' IN (mapped_digree_0, mapped_digree_1,mapped_digree_2, mapped_digree_3)
       AND  '${current_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)
       AND '${desired_title}' IN (mapped_title_0, mapped_title_1,mapped_title_2, mapped_title_3, mapped_title_4, mapped_title_5,  mapped_title_6, mapped_title_7)) 
       AS row_counts_all_degree_and_all_title`;

      const [rows] = await connection.query(query);
      return rows;
    } catch (err) {
      // Handle errors here
      console.error(err);
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  },
};

module.exports = LinkedinModel;
