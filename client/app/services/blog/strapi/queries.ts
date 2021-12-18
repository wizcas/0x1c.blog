import { gql } from 'graphql-request';

import type { ID } from './generalTypes';
import type {
  CategoryAttributes,
  Collection,
  ArticleAttributes,
  Singular,
} from './responseData';

export interface QueryCategoriesResponse {
  categories: Collection<CategoryAttributes>;
}
export const queryCategories = gql`
  query Categories {
    categories {
      data {
        id
        attributes {
          title
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          themeColor
          description
        }
      }
    }
  }
`;

export const queryCategoriesWithArticles = gql`
  query CategoriesWithArticles {
    categories {
      data {
        id
        attributes {
          title
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          themeColor
          description
          articles(sort: "updatedAt:desc", pagination: { limit: 3 }) {
            data {
              id
              attributes {
                title
                excerpt
                cover {
                  data {
                    attributes {
                      url
                      previewUrl
                    }
                  }
                }
                updatedAt
                topic {
                  data {
                    id
                    attributes {
                      title
                    }
                  }
                }
                tags {
                  data {
                    id
                    attributes {
                      label
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type QueryCategoryVariable = { categoryId: ID };
export type QueryCategoryResponse = { category: Singular<CategoryAttributes> };
export const queryCategory = gql`
  query Category($categoryId: ID!) {
    category(id: $categoryId) {
      data {
        id
        attributes {
          title
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          themeColor
          description
          topics {
            data {
              id
              attributes {
                title
              }
            }
          }
          tags {
            data {
              id
              attributes {
                label
              }
            }
          }
        }
      }
    }
  }
`;

export type QueryTopicsVariable = { categoryId: ID };
export const queryTopics = gql`
  query TopicsByCategory($categoryId: ID!) {
    topics(filters: { category: { id: { eq: $categoryId } } }) {
      data {
        id
        attributes {
          title
          category {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export type QueryTagsVariable = { categoryId: ID };
export const queryTags = gql`
  query TagsByCategory($categoryId: ID!) {
    tags(filters: { category: { id: { eq: $categoryId } } }) {
      data {
        id
        attributes {
          label
          category {
            data {
              id
              attributes {
                title
              }
            }
          }
        }
      }
    }
  }
`;

export type QueryArticlesVariable = {
  categoryId: ID;
  topicId?: ID;
  tagIds?: ID[];
  page?: number;
  pageSize?: number;
};
export type QueryArticlesResponse = {
  articles: Collection<ArticleAttributes>;
};
export const queryArticles = gql`
  query ArticlesByFilters(
    $categoryId: ID!
    $topicId: ID
    $tagIds: [ID]
    $page: Int
    $pageSize: Int
  ) {
    articles(
      sort: "updatedAt:desc"
      pagination: { page: $page, pageSize: $pageSize }
      filters: {
        category: { id: { eq: $categoryId } }
        topic: { id: { eq: $topicId } }
        tags: { id: { in: $tagIds } }
      }
    ) {
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
      data {
        id
        attributes {
          title
          excerpt
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          updatedAt
          topic {
            data {
              id
              attributes {
                title
              }
            }
          }
          tags {
            data {
              id
              attributes {
                label
              }
            }
          }
        }
      }
    }
  }
`;

export type QueryArticleVariable = { id: ID };
export type QueryArticleResponse = { article: Singular<ArticleAttributes> };
export const queryArticle = gql`
  query ($id: ID!) {
    article(id: $id) {
      data {
        id
        attributes {
          title
          updatedAt
          cover {
            data {
              attributes {
                url
                previewUrl
              }
            }
          }
          category {
            data {
              id
              attributes {
                title
              }
            }
          }
          topic {
            data {
              id
              attributes {
                title
              }
            }
          }
          tags {
            data {
              id
              attributes {
                label
              }
            }
          }
          content
        }
      }
    }
  }
`;
