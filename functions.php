<?php

require 'inc/dashboard.php';

function enqueue_scripts() {
    wp_enqueue_script( 'get-pagespeed', get_stylesheet_directory_uri() . '/assets/get-pagespeed.js', '', '', true );
}
add_action('admin_enqueue_scripts', 'enqueue_scripts' );
