import { EXERCISE_EQUIVALENTS } from "../constants";

export function calculateExercise(calories: number): string {
  for (let i = 0; i < EXERCISE_EQUIVALENTS.length; i++) {
    const { calories: exerciseCalories, exercise } = EXERCISE_EQUIVALENTS[i];
    if (calories <= exerciseCalories) {
      const count = Math.ceil(calories / exerciseCalories);
      return `${count}回の${exercise}`;
    }
  }

  // If calories exceed the highest exercise equivalent
  const { calories: highestCalories, exercise } =
    EXERCISE_EQUIVALENTS[EXERCISE_EQUIVALENTS.length - 1];
  const count = Math.ceil(calories / highestCalories);
  return `${count}回の${exercise}`;
}
