export function staticCommunitySidebar(): any {
  return {
    "/community/": {
      "base": "/community/",
      "items": [
        {
          "text": "Review Meetings",
          "link": "review-meetings/index.md",
          "items": [
            {
              "text": "Gardener Review Meetings 2025",
              "link": "review-meetings/2025-reviews"
            },
            {
              "text": "Gardener Review Meetings 2024",
              "link": "review-meetings/2024-reviews"
            },
            {
              "text": "Gardener Review Meetings 2023",
              "link": "review-meetings/2023-reviews"
            },
            {
              "text": "Gardener Review Meetings 2022",
              "link": "review-meetings/2022-reviews"
            },
            {
              "text": "Gardener Community Meetings 2022",
              "link": "review-meetings/2022-community"
            }
          ],
          "collapsed": true
        },
        {
          "text": "Product Steering",
          "link": "product-steering/index.md"
        },
        {
          "text": "Technical Steering",
          "link": "technical-steering/index.md"
        }
      ],
      "text": "Community"
    }
  }
}