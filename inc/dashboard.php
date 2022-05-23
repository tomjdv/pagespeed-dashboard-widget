<?php
add_action('wp_dashboard_setup', 'register_qa_widget');
  
function register_qa_widget() {
    global $wp_meta_boxes;
    wp_add_dashboard_widget( 'qa_widget', 'Quality Assurance', 'qa_widget_html');
}
 
function qa_widget_html() {
    get_template_part( 'templates/qa-widget' );
}