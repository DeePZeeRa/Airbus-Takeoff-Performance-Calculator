import { findEngine } from '../data/aircraftData';

export const calculateTakeoffPerformance = (params) => {
  const engine = findEngine(params.aircraftType, params.aircraftVariant, params.engineType);

  // --- CG % Calculation ---
  let cgPercent = 25; // Default if not provided
  if (
    params.cgPosition !== undefined &&
    params.lemac !== undefined &&
    params.mac !== undefined &&
    params.mac !== 0
  ) {
    cgPercent = ((params.cgPosition - params.lemac) / params.mac) * 100;
  }

  // Factors for performance adjustments
  const weightFactor = 0.5;
  const tempFactor = 0.3;
  const runwayFactor = 0.1;

  // Base speeds
  let v1Base = 130, vrBase = 138, v2Base = 140;

  // Weight adjustment
  const weightInTons = params.takeoffWeight / 1000;
  const weightAdjustment = (weightInTons - 65) * weightFactor;

  // Temperature adjustment
  const tempAdjustment = (params.temperature - 15) * tempFactor;

  // Adjusted takeoff speeds
  let v1 = Math.round(v1Base + weightAdjustment + tempAdjustment);
  let vr = Math.round(vrBase + weightAdjustment + tempAdjustment);
  let v2 = Math.round(v2Base + weightAdjustment + tempAdjustment);

  // Flap setting adjustment
  const flapNum = parseInt(params.flapSetting) || 1;
  v1 -= (flapNum - 1) * 2;
  vr -= (flapNum - 1) * 2;
  v2 -= (flapNum - 1) * 1;

  // FLEX thrust adjustment
  if (params.thrustSetting === 'FLEX') {
    v1 += 2; vr += 2; v2 += 1;
  }

  // Runway surface condition adjustment
  if (params.surfaceCondition === 'Wet') {
    v1 += 5; vr += 3;
  } else if (params.surfaceCondition === 'Contaminated') {
    v1 += 10; vr += 5;
  }

  // --- Wind Adjustment ---
  const runwayHeading = params.runwayHeading || 0; // Runway heading in degrees
  const windDirection = params.windDirection || 0; // Wind direction in degrees
  const windSpeed = params.windSpeed || 0; // Wind speed in knots

  // Calculate headwind or tailwind component
  const windAngle = Math.abs(windDirection - runwayHeading);
  const headwind = Math.round(windSpeed * Math.cos((windAngle * Math.PI) / 180));
  const tailwind = Math.abs(Math.min(headwind, 0)); // Tailwind is negative headwind
  const effectiveHeadwind = Math.max(headwind, 0); // Headwind is positive

  // Adjust takeoff speeds based on wind
  v1 -= Math.round(effectiveHeadwind / 2); // Reduce V1 for headwind
  vr -= Math.round(effectiveHeadwind / 2); // Reduce VR for headwind
  v2 -= Math.round(effectiveHeadwind / 2); // Reduce V2 for headwind

  v1 += Math.round(tailwind / 2); // Increase V1 for tailwind
  vr += Math.round(tailwind / 2); // Increase VR for tailwind
  v2 += Math.round(tailwind / 2); // Increase V2 for tailwind

  // Max allowable takeoff weight
  const maxWeightBase = 78000;
  const runwayLengthAdjustment = (params.toraLength - 2500) * runwayFactor;
  const maxWeight = Math.round(maxWeightBase + runwayLengthAdjustment);

  // Green dot speed
  const greenDot = Math.round(220 * Math.sqrt(params.takeoffWeight / 70000));

  // Limiting factor
  let limitedBy = 'Max Takeoff Weight';
  if (params.takeoffWeight > maxWeight) {
    limitedBy = 'Runway Length';
  } else if (params.temperature > 35) {
    limitedBy = 'Temperature';
  }

  // Improved climb
  if (params.useImprovedClimb) {
    v2 += 5;
  }

  // --- FLEX-to-Temp Calculation ---
  const maxFlexTemp = 65;
  const minFlexTemp = params.temperature + 5;
  const weightMargin = maxWeight - params.takeoffWeight;
  let flexTemp = params.temperature + 5 + Math.min(20, Math.max(0, Math.floor(weightMargin / 1000)));
  flexTemp = Math.max(minFlexTemp, Math.min(flexTemp, maxFlexTemp));

  // --- Takeoff Trim Calculation ---
  let trimBase = 1.5 - (flapNum - 1) * 0.2;
  let trimSlope = 0.05;
  let trimValue = trimBase - trimSlope * cgPercent;
  trimValue = Math.round(trimValue * 10) / 10;
  const trimDirection = trimValue >= 0 ? 'UP' : 'DN';
  const trimDisplay = `${trimDirection} ${Math.abs(trimValue)}`;

  // Result object
  const result = {
    registration: 'N320SB',
    aircraftType: params.aircraftType,
    engineType: engine?.name || 'CFM56-5B4/P',
    weight: params.takeoffWeight,
    weightUnit: params.weightUnit,
    bleedSetting: params.bleedSetting,
    antiIceSetting: params.antiIceSetting,
    flapSetting: params.flapSetting,
    thrustSetting: params.thrustSetting,
    temperature: Math.round(flexTemp),
    v1: v1,
    vr: vr,
    v2: v2,
    maxWeight: maxWeight,
    limitedBy: limitedBy,
    greenDot: greenDot,
    takeoffTrim: trimDisplay,
    cgPercent: Math.round(cgPercent * 10) / 10,
    status: 'success',
    toraLength: params.toraLength,
    toda: params.toraLength + 500,
    asda: params.toraLength + 500,
    lda: params.toraLength - 500,
    windDirection: windDirection,
    windSpeed: windSpeed,
    headwind: effectiveHeadwind,
    tailwind: tailwind,
  };

  if (params.takeoffWeight > maxWeight) {
    result.message = 'Warning: Takeoff weight exceeds maximum allowed weight for this runway.';
    result.status = 'warning';
  }

  console.log('Takeoff Performance Calculation Result:', result);
  return result;
};