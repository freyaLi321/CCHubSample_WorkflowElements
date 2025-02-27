// Example of SimpleEditor settings.
export const simpleEditorBasicSampleSettings = {
    pageSelector: {
        enabled: true,
    },
    options: {
        disableUnavailable: true,
    },
    designVariants: {
        type: "List",
        showLessModeEnabled: true,
        showValueInTitle: true,
        showLessModeRows: 3,
    },
    proof: {
        downloadButtonEnabled: true,
        openInNewTab: true,
        proofRenderingConfig: {
            format: "Pdf",
            width: 2000,
            height: 2000,
            watermarkEnabled: true,
            watermarkOpacity: 1,
        },
    },
    validations: {
        approvalCheckboxEnabled: true,
        ignoringFormValidationEnabled: true,
        approvalWarningModeEnabled: false,
    },
    productDetails: {
        priceVisible: false,
        skuVisible: true,
    },
    designViewer: {
        surfaceShadowEnabled: false,
        previewMode: true,
    },
}