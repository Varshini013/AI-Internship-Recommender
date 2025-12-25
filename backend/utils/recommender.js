/**
 * Lightweight AI-based Internship Recommendation Engine
 * Rule-based + scoring approach
 */

function recommend(student, internships) {
  const results = internships.map((internship) => {
    let score = 0;

    // Skill matching (most important)
    const skillMatches = internship.requiredSkills.filter((skill) =>
      student.skills.includes(skill)
    );
    score += skillMatches.length * 3;

    // Location preference
    if (student.location && internship.location === student.location) {
      score += 2;
    }

    // Interest match (domain)
    if (
      student.interests &&
      student.interests.includes(internship.domain)
    ) {
      score += 2;
    }

    return {
      internship,
      score,
      matchedSkills: skillMatches
    };
  });

  // Sort by score (descending)
  results.sort((a, b) => b.score - a.score);

  // Return top 3–5 internships
  return results.slice(0, 5);
}

module.exports = recommend;
