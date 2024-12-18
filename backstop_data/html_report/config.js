report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_qqmap_0_document_0_phone.png",
        "test": "../bitmaps_test/20241103-160904/backstop_default_qqmap_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_qqmap_0_document_0_phone.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "rawMisMatchPercentage": 4.213541666666667,
          "misMatchPercentage": "4.21",
          "analysisTime": 7
        },
        "diffImage": "../bitmaps_test/20241103-160904/failed_diff_backstop_default_qqmap_0_document_0_phone.png"
      },
      "status": "fail"
    },
    {
      "pair": {
        "reference": "../bitmaps_reference/backstop_default_qqmap_0_document_1_tablet.png",
        "test": "../bitmaps_test/20241103-160904/backstop_default_qqmap_0_document_1_tablet.png",
        "selector": "document",
        "fileName": "backstop_default_qqmap_0_document_1_tablet.png",
        "label": "qqmap",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://map.qq.com/m/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "tablet",
        "error": "Reference file not found /Users/yuanzhijia/Desktop/yd-interface/backstop_data/bitmaps_reference/backstop_default_qqmap_0_document_1_tablet.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});