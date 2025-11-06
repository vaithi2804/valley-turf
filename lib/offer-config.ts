// Change OFFERS_ENABLED to false to disable offers temporarily
// Set back to true to re-enable offers

export const OFFERS_ENABLED = false

export const getOfferDetails = (hours: number) => {
  if (!OFFERS_ENABLED) return { chargeableHours: hours, offerApplied: false }

  if (hours === 3) {
    return { chargeableHours: 2, offerApplied: true }
  } else if (hours === 4) {
    return { chargeableHours: 3, offerApplied: true }
  } else if (hours === 5) {
    return { chargeableHours: 4, offerApplied: true }
  } else if (hours === 6) {
    return { chargeableHours: 4, offerApplied: true }
  }

  return { chargeableHours: hours, offerApplied: false }
}
