import type {StructureResolver} from 'sanity/structure'

// 제품(product) 카테고리 그룹 — src/sanity/schemaTypes/product.ts 의 category 옵션과 동기화
const PRODUCT_GROUPS = [
  { key: 'mixer-defoamer', title: '교반/탈포기', categories: ['mixer-defoamer'] },
  { key: 'three-roll-mill', title: '쓰리롤밀', categories: ['three-roll-mill'] },
  { key: 'filling', title: '충진기', categories: ['standalone-filling'] },
  { key: 'dispenser', title: '디스펜서', categories: ['standalone-dispenser'] },
  { key: 'robot', title: '3축로봇', categories: ['standalone-robot'] },
  { key: 'curing', title: '경화기', categories: ['standalone-curing'] },
  { key: 'consumables', title: '소모품', categories: ['consumables'] },
]

// 자료실(referenceMaterial) 카테고리 그룹 — src/sanity/schemaTypes/referenceMaterial.ts 의 category 옵션과 동기화
const RESOURCE_GROUPS = [
  { key: 'notice', title: '공지사항' },
  { key: 'tech-docs', title: '기술자료실' },
  { key: 'ir', title: '투자정보' },
]

// 블로그(blogPost) 카테고리 그룹 — src/sanity/schemaTypes/blogPost.ts 의 category 옵션과 동기화
const BLOG_POST_GROUPS = [
  { key: 'insight', title: '인사이트' },
  { key: 'guide-intro', title: '액상 공정 엔지니어링 위키' },
  { key: 'news', title: '뉴스' },
]

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id('product')
        .title('제품')
        .child(
          S.list()
            .id('product-categories')
            .title('제품 — 카테고리')
            .items(
              PRODUCT_GROUPS.map((group) =>
                S.listItem()
                  .id(`product-group-${group.key}`)
                  .title(group.title)
                  .child(
                    S.documentList()
                      .id(`product-group-${group.key}-list`)
                      .title(group.title)
                      .filter('_type == "product" && category in $categories')
                      .params({ categories: group.categories })
                      .initialValueTemplates([
                        S.initialValueTemplateItem('product-by-category', { category: group.categories[0] }),
                      ])
                  )
              )
            )
        ),
      S.listItem()
        .id('referenceMaterial')
        .title('자료실')
        .child(
          S.list()
            .id('referenceMaterial-categories')
            .title('자료실 — 카테고리')
            .items(
              RESOURCE_GROUPS.map((group) =>
                S.listItem()
                  .id(`referenceMaterial-group-${group.key}`)
                  .title(group.title)
                  .child(
                    S.documentList()
                      .id(`referenceMaterial-group-${group.key}-list`)
                      .title(group.title)
                      .filter('_type == "referenceMaterial" && category == $category')
                      .params({ category: group.key })
                      .initialValueTemplates([
                        S.initialValueTemplateItem('referenceMaterial-by-category', { category: group.key }),
                      ])
                  )
              )
            )
        ),
      S.listItem()
        .id('blog')
        .title('블로그')
        .child(
          S.list()
            .id('blog-categories')
            .title('블로그 — 카테고리')
            .items([
              S.listItem()
                .id('blog-cases')
                .title('적용사례')
                .child(S.documentTypeList('caseStudy').id('blog-cases-list').title('적용사례')),
              ...BLOG_POST_GROUPS.map((group) =>
                S.listItem()
                  .id(`blog-group-${group.key}`)
                  .title(group.title)
                  .child(
                    S.documentList()
                      .id(`blog-group-${group.key}-list`)
                      .title(group.title)
                      .filter('_type == "blogPost" && category == $category')
                      .params({ category: group.key })
                  )
              ),
            ])
        ),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== 'product' &&
          item.getId() !== 'referenceMaterial' &&
          item.getId() !== 'caseStudy' &&
          item.getId() !== 'blogPost'
      ),
    ])
