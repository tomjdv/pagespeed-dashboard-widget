<form id="check-pagespeed">
    <style>
        .input-text-wrap {
            margin-bottom: 8px;
        }

        .input-text-wrap label {
            display: inline-block;
            margin-bottom: 4px;
        }

        #check-pagespeed-btn {
            margin-top: 6px;
        }
    </style>

    <div id="live-feedback"></div>

    <div class="input-text-wrap">
        <input type="text" name="url1" id="url-1" placeholder="A URL to test">
    </div>
    <div class="input-text-wrap">
        <input type="text" name="url2" id="url-2" placeholder="A URL to test">
    </div>
    <div class="input-text-wrap">
        <input type="text" name="url3" id="url-3" placeholder="A URL to test">
    </div>

    <div id="desktop-result"></div>
    <div id="mobile-result"></div>

    <button type="submit" id="check-pagespeed-btn" class="button button-primary">Check PageSpeed</button>
</form>
