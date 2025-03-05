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

export const handyEditorBasicSampleSettings = {
    assetLibrary: {
        text: { enabled: true },
        shapes: { enabled: true },
        images: { enabled: true },
        cliparts: { enabled: true },
        imageUploader: { enabled: true },
        templates: { enabled: true },
        productOptions: { enabled: true }
    },
    designViewer: {
        grid: {
            step: 10,
            gridEnabled: false
        }
    },
    imageUploader: {
        insertByDefaultAs: "Auto",
        insertFileAs: {
            svg: "Shape",
            pdf: "Clipart",
            png: "Image",
            jpeg: "Image"
        }
    },
    itemValidation: {
        qualityMeter: {
            targetResolution: 300,
            bad: 50,
            warning: 80
        }
    },
    leaveConfirmation: {
        enabled: false
    }
};

