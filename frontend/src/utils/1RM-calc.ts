// Lombardi formula for calculating one-rep max (1RM) based on weight and reps is most accurate for
export const one_rep_max = (weight: number, reps: number): number => {
    return lombardi_formula(weight, reps);
};

const lombardi_formula = (weight: number, reps: number): number => {
    if (reps <= 0) {
        throw new Error("Reps must be greater than 0");
    }
    return weight * Math.pow(reps, 0.1);
};

/* const epley_formula = (weight: number, reps: number): number => {
  if (reps <= 0) {
    throw new Error("Reps must be greater than 0");
  }
  return weight * (1 + reps / 30);
}

const brzycki_formula = (weight: number, reps: number): number => {
  if (reps <= 0) {
    throw new Error("Reps must be greater than 0");
  }
  return weight / (1.0278 - 0.0278 * reps);
}


const mayhew_formula = (weight: number, reps: number): number => {
  if (reps <= 0) {
    throw new Error("Reps must be greater than 0");
  }
  return 100 * weight / (52.2 + 41.9 * Math.exp(-0.055 * reps));
}

const oconner_formula = (weight: number, reps: number): number => {
  if (reps <= 0) {
    throw new Error("Reps must be greater than 0");
  }
  return weight * (1 + 0.025 * reps);
} */
