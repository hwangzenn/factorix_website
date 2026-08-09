// src/lib/productCategoryRoutes.ts
// Sanity product.category 값 → 그 카테고리가 노출되는 목록 페이지 경로.
// sitemap.ts와 산업별 포트폴리오 카드(ManufacturingAutomationIndustryDetail)가 공유한다.

import { ROUTES } from "./routes"

export const PRODUCT_CATEGORY_ROUTE: Record<string, string> = {
  "mixer-defoamer": ROUTES.solutions.equipment.mixer,
  "three-roll-mill": ROUTES.solutions.equipment.threeRollMill,
  "equipment-filling": ROUTES.solutions.equipment.filling,
  "equipment-dispenser": ROUTES.solutions.equipment.dispenser,
  "equipment-robot": ROUTES.solutions.equipment.robot,
  "equipment-curing": ROUTES.solutions.equipment.curing,
  consumables: ROUTES.solutions.equipment.consumables,
  "equipment-systems-smart-factory": ROUTES.solutions.automationSystem,
}
