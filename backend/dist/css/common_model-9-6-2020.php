<?php
class Common_model extends MY_Model
{
    
    public $_table;
    function __construct()
    {
        // Call the Model constructor
        $this->load->library('email');
        parent::__construct();
        
        $this->load->library('form_validation');
        $this->load->library('encrypt_ssn');
        $this->validation_messages();
    }
    
    
    #######################
    #validation messages
    #######################
    
    function validation_messages()
    {
        $this->form_validation->set_error_delimiters("<li class='error_class'>", "</li>");
        $this->form_validation->set_message('required', '%s is required.');
        $this->form_validation->set_message('min_length', '%s must be at least %s characters in length..');
        $this->form_validation->set_message('max_length', '%s field can not exceed %s characters in length.');
        $this->form_validation->set_message('matches', '%s does not match the %s');
        $this->form_validation->set_message('valid_email', '%s must contain a valid email address.');
        $this->form_validation->set_message('alpha_numeric', '%s may only contain alpha-numeric characters..');
        $this->form_validation->set_message('alpha', '%s may only contain alphabetical characters.');
        $this->form_validation->set_message('numeric', '%s must contain only numbers.');
        $this->form_validation->set_message('selected', '%s is required.');
        $this->form_validation->set_message('is_unique', '%s already  exists.');
        $this->form_validation->set_message('validate_label', '%s is required.');
        $this->form_validation->set_message('alfa_first_char', 'First letter of %s must be a character.');
        $this->form_validation->set_message('required_file', '%s is required.');
        $this->form_validation->set_message('checked', '%s is required.');
        $this->form_validation->set_message('validate_auction', 'You may entered incorrect draw id.');
        $this->form_validation->set_message('greater_than', '%s must contain a number greater than %s');
        
    }
    
    #######################
    #paging variables
    #######################
    
    function paging_variables(&$terms = NULL, $uri_seg = 4)
    {
        $total_seg         = $this->uri->total_segments();
        $config['uri_seg'] = $uri_seg;
        $terms             = array();
        
        if ($total_seg > $uri_seg) {
            $uri_str           = substr($this->uri->uri_string(), 1);
            $uri_arr           = explode("/", $uri_str);
            $total_seg         = count($uri_arr);
            $config['uri_seg'] = $total_seg;
            // $this->terms is defined as an empty array in the constructor
            $terms             = $this->uri->uri_to_assoc($uri_seg);
            //unset the last item in array
            end($terms);
            $key = key($terms);
            if (isset($terms[$key]) && $terms[$key] == "") // unset the key when value is null
                unset($terms[$key]);
        }
        
        
        /*  $config['full_tag_open']    = '<div class="pagination"><ul>';
        $config['full_tag_close']   = '</ul></div>';
        $config['num_tag_open']     = '<li>';
        $config['num_tag_close']    = '</li>';
        $config['next_link']        = 'Next';
        $config['next_tag_open']    = '<li>';
        $config['next_tag_close']   = '</li>';
        $config['prev_link']        = 'Prev';
        $config['prev_tag_open']    = '<li>';
        $config['prev_tag_close']   = '</li>';
        $config['first_link']           = 'First';
        $config['first_tag_open']   = '<li>';
        $config['first_tag_close']  = '</li>';
        $config['last_link']            = 'Last';
        $config['last_tag_open']    = '<li>';
        $config['last_tag_close']   = '</li>';
        $config['cur_tag_open']     = '<li><b>';
        $config['cur_tag_close']    = '</b></li>';
        $config['num_links']        = 10;
        $config['per_page']         = 15;
        $config['uri_segment']  = $config['uri_seg'];*/
        
        $config['full_tag_open']   = '<div class="pagination pagination-small pull-right"><ul>';
        $config['full_tag_close']  = '</ul></div>';
        $config['num_tag_open']    = '<li>';
        $config['num_tag_close']   = '</li>';
        $config['next_link']       = '&raquo;';
        $config['next_tag_open']   = '<li>';
        $config['next_tag_close']  = '</li>';
        $config['prev_link']       = '&laquo;';
        $config['prev_tag_open']   = '<li>';
        $config['prev_tag_close']  = '</li>';
        $config['first_link']      = 'First';
        $config['first_tag_open']  = '<li>';
        $config['first_tag_close'] = '</li>';
        $config['last_link']       = 'Last';
        $config['last_tag_open']   = '<li>';
        $config['last_tag_close']  = '</li>';
        $config['cur_tag_open']    = '<li class="active"><a href="#">';
        $config['cur_tag_close']   = '</a></li>';
        $config['num_links']       = 10;
        $config['per_page']        = 15;
        $config['uri_segment']     = $config['uri_seg'];
        
        return $config;
        
    }
    
    
    
    #####################
    #upload variables
    #####################
    
    
    
    function upload_variables($uploadpath)
    {
        
        $config['upload_path']    = 'images/uploads/' . @$uploadpath . '/';
        $config['allowed_types']  = 'gif|jpg|png|bmp|jpeg';
        $config['max_size']       = '0';
        $config['max_width']      = '0';
        $config['max_height']     = '0';
        /* Load the upload library */
        /* Create the config for image library */
        //$configThumb = array();  
        $config['image_library']  = 'gd2';
        //$configThumb['source_image'] = '';  
        //$configThumb['create_thumb'] = TRUE;  
        $config['maintain_ratio'] = TRUE;
        $config['width']          = 140;
        $config['height']         = 210;
        return $config;
        
    }
    function upload_variables_user($uploadpath, $file_name)
    {
        $file_name                = date("Ymd his") . "_" . $file_name;
        $config['upload_path']    = 'images/uploads/' . @$uploadpath . '/';
        $config['allowed_types']  = 'gif|jpg|png|bmp|jpeg';
        $config['max_size']       = '0';
        $config['max_width']      = '0';
        $config['max_height']     = '0';
        $config['file_name']      = str_replace(' ', '_', $file_name);
        /* Load the upload library */
        /* Create the config for image library */
        //$configThumb = array();  
        $config['image_library']  = 'gd2';
        //$configThumb['source_image'] = '';  
        //$configThumb['create_thumb'] = TRUE;  
        $config['maintain_ratio'] = TRUE;
        $config['width']          = 140;
        $config['height']         = 210;
        return $config;
        
    }
    function upload_variables_userdoc($uploadpath, $file_name)
    {
        $file_name                = date("Ymd his") . "_" . $file_name;
        $config['upload_path']    = 'images/uploads/' . @$uploadpath . '/';
        $config['allowed_types']  = '*';
        $config['max_size']       = '';
        // $config['max_width']  = '0';  
        // $config['max_height']  = '0';  
        $config['file_name']      = str_replace(' ', '_', $file_name);
        /* Load the upload library */
        /* Create the config for image library */
        //$configThumb = array();  
        $config['image_library']  = 'gd2';
        //$configThumb['source_image'] = '';  
        //$configThumb['create_thumb'] = TRUE;  
        $config['maintain_ratio'] = TRUE;
        // $config['width'] = 140;  
        // $config['height'] = 210;         
        return $config;
        
    }
    
    function upload_video_variables($uploadpath)
    {
        
        $config['upload_path']    = 'images/uploads/' . @$uploadpath . '/';
        $config['allowed_types']  = 'flv|avi|mp4';
        $config['max_size']       = '12300000';
        $config['max_width']      = '10000000';
        $config['max_height']     = '10000000';
        $config['maintain_ratio'] = TRUE;
        /* Load the upload library */
        /* Create the config for image library */
        //$configThumb = array();  
        $config['image_library']  = 'gd2';
        //$configThumb['source_image'] = '';  
        //$configThumb['create_thumb'] = TRUE;  
        /* $config['maintain_ratio'] = TRUE;  
        $config['width'] = 140;  
        $config['height'] = 210; */
        return $config;
        
    }
    
    function upload_variables_doc($uploadpath)
    {
        $config['upload_path']   = 'images/uploads/' . $uploadpath . '/';
        $config['allowed_types'] = 'doc|docx|pdf|txt';
        //$config['encrypt_name']  = TRUE;
        $config['max_size']      = '';
        return $config;
    }
    
    
    function csv_upload_variables($folder_path = 'INST_PATH')
    {
        
        $config['upload_path']   = './images/uploads/';
        $config['allowed_types'] = '*';
        $config['max_size']      = '';
        return $config;
    }
    
    ####################
    //file upload variables
    ####################     
    
    function fileupload_variables($uploadpath)
    {
        
        $config['upload_path']   = 'images/' . @$uploadpath . '/';
        $config['allowed_types'] = 'gif|jpg|png|bmp|jpeg';
        $config['max_size']      = '';
        return $config;
    }
    
    
    ###################
    #get random string
    ##################
    
    public function genRandomString()
    {
        $length     = 10;
        $characters = "0123456789abcdefghijklmnopqrstuvwxyz";
        $string     = "";
        
        for ($p = 0; $p < $length; $p++) {
            $string .= $characters[mt_rand(0, strlen($characters) - 1)];
        }
        
        return $string;
    }
    
    ###################
    #send user email
    ##################
    
    function send_admin_email($from = "Greetings@sharestates.com", $to, $subject, $body, $to_user = NULL, $attachment = NULL, $Bcc = NULL,$cc=NULL){
        
        if($from == ""){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }elseif($from == "LoanServicing@sharestates.com"){
            $name = "Sharestates LoanServicing";
        }elseif($from == "processing@sharestates.com"){
            $name = "Sharestates";
        }else{
            $name = "Sharestates";
        }

        if($from == "LoanServicing@sharestates.com"){
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }elseif($from == "processing@sharestates.com"){
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: processing@sharestates.com' . "\r\n";
        }else{
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: '.$from. "\r\n";
        }
     
        $headers .= 'Bcc: help@ssapp.support' . "\n";      
        if ($Bcc != '') {
           // $headers .= 'Bcc: hari.maddali@gmail.com' . "\n";
        }
        if ($cc != '') {
            $headers .= 'cc: '.$cc. "\n";
        }
        $headers .= 'X-Mailer: PHP/' . phpversion();
        $body = wordwrap($body, 70, "\n");
        return mail($to, $subject, $body, $headers);
        
    }

    ###################
    #send user email
    ##################
    
    function send_admin_bccemail($from = "Greetings@sharestates.com", $to, $subject, $body, $to_user = NULL, $attachment = NULL, $Bcc = NULL,$cc=NULL){
        
        $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\n" . 'MIME-Version: 1.0' . "\n" . 'Content-type: text/html; charset=utf-8' . "\n";
        $headers .= 'Bcc: help@ssapp.support' . "\n"; 
        //$headers .= 'Bcc: prinu.bharathi@gmail.com' . "\n";      
        if ($Bcc != '') {
           // $headers .= 'Bcc: hari.maddali@gmail.com' . "\n";
        }
        if ($cc != '') {
            //$headers .= 'cc: dmyers@sharestates.com' . "\n";
        }
        $headers .= 'X-Mailer: PHP/' . phpversion();
        $body = wordwrap($body, 70, "\n");
        return mail($to, $subject, $body, $headers);
        
        
    }
  
     function send_admin_email_reg($from = "Greetings@sharestates.com", $to, $subject, $body,$attachment = NULL, $Bcc = NULL)
    {
       
        $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n";
       if ($Bcc != '') {
          
            $headers .= 'Bcc: help@ssapp.support' . "\r\n";
        }
        $headers .= 'X-Mailer: PHP/' . phpversion();
       
        return mail($to, $subject, $body, $headers);
        
        
    }
    function send_admin_email_cc($from = "Greetings@sharestates.com", $to, $subject, $body, $to_user = NULL, $attachment = NULL, $Bcc = NULL)
    {
        /*$headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: Sharestates <customerservices@sharestates.com>' . "\r\n";
        return mail($to, $subject, $body, $headers);*/
        //echo "fdghdfg";
        
        // if($this->get_current_domain == 'sharestates.com') {
        
        
        $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n";
        // 'Reply-To:'. $to_user . "\r\n" .
        
        //'cc: hemaravi7878@gmail.com' . "\r\n" .
        // 'cc: kevin@sharestates.com' . "\r\n" .
        //'Bcc: alex@sharestates.com'. "\r\n".
        //'X-Mailer: PHP/' . phpversion();
        // echo $headers;die;
        // }else {
        
        //               $headers = 'From: Sharestates  <hello@sharestates.com>' . "\r\n" .
        //                 'MIME-Version: 1.0' . "\r\n".
        //                 'Content-type: text/html; charset=utf-8' . "\r\n".
        //                  'Reply-To:'. $to_user . "\r\n" .
        
        //                    //'cc: athira.bharathi@gmail.com' . "\r\n" .
        //                //  'cc: kevin@sharestates.com' . "\r\n" .
        //                  //'Bcc: alex@sharestates.com'. "\r\n".
        //                 'X-Mailer: PHP/' . phpversion();
        //                // echo $headers;die;
        
        // }           
        
        // $headers .= 'Bcc: sumesh12.bharathi@gmail.com\r\n';
        // $headers .= 'cc: Kevin@sharestates.com\r\n';        
        
        //$headers .= 'cc: athira.bharathi@gmail.com\r\n';         
        if ($cc != '') {
            // $headers .= 'cc: hari.maddali@gmail.com' . "\r\n";
            // $headers .= 'cc: prasadcg@gmail.com' . "\r\n"; 
            $headers .= 'cc: help@ssapp.support' . "\r\n"; 
        }
        $headers .= 'X-Mailer: PHP/' . phpversion();
        return mail($to, $subject, $body, $headers);
        
        
    }
    
    function getproject($pid = NULL)
    {
        $this->db->select('*');
        $this->db->from('funds_dev_projects');
        $this->db->where('project_id', $pid);
        $result = $this->db->get();
        return $result->row_array();
    }
    
    
    
    function send_user_email($from = "Greetings@sharestates.com", $to, $subject, $body, $attachment = NULL, $cc = NULL, $bcc = NULL,$invoice = NULL)
    {
        if($from==""){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }elseif($from == "LoanServicing@sharestates.com" || $from =="loanservicing@sharestates.com"){
            $name = "Sharestates LoanServicing";
        }elseif($from == "processing@sharestates.com"){
            $name = "Sharestates";
        }elseif($from == "investors@sharestates.com"){
            $name = "Sharestates";
        }elseif($from == "accounting@sharestates.com"){
            $name = "Sharestates";
        }else{
            $name = "Sharestates";
        }

        if($invoice!='' && $from != "LoanServicing@sharestates.com" && $from !="loanservicing@sharestates.com") {
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n".'Reply-To: steven@sharestates.com' . "\r\n";
        }else if($invoice!='' && $from == "LoanServicing@sharestates.com") {
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n".'Reply-To: steven@sharestates.com' . "\r\n". "\r\n". 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }else if($from == "LoanServicing@sharestates.com" || $from =="loanservicing@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }else if($from == "processing@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: processing@sharestates.com' . "\r\n";
        }else if($from == "investors@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: investors@sharestates.com' . "\r\n";
        }else if($from == "accounting@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: accounting@sharestates.com' . "\r\n";
        }else{
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: Greetings@sharestates.com' . "\r\n";
        }
       
        //'X-Mailer: PHP/' . phpversion();
        if ($cc != '') {
            // $headers .= 'cc: hari.maddali@gmail.com' . "\r\n";
            // $headers .= 'cc: prasadcg@gmail.com' . "\r\n";
            $headers .= 'cc: help@ssapp.support' . "\r\n";
            
        }
        
        if ($bcc != '') {
            // $headers .= 'Bcc: hari.maddali@gmail.com' . "\r\n";
            // $headers .= 'Bcc: prasadcg@gmail.com' . "\r\n"; 
            $headers .= 'Bcc: help@ssapp.support' . "\r\n";
        }
        
        $headers .= 'X-Mailer: PHP/' . phpversion();
        
        return mail($to, $subject, $body, $headers);
    }

    function send_user_emailbcc($from = "Greetings@sharestates.com", $to, $subject, $body, $attachment = NULL, $cc = NULL, $bcc = NULL,$invoice = NULL)
    {
        if($from==""){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }elseif($from == "LoanServicing@sharestates.com"){
            $name = "Sharestates LoanServicing";
        }elseif($from == "processing@sharestates.com"){
            $name = "Sharestates";
        }elseif($from == "investors@sharestates.com"){
            $name = "Sharestates";
        }else{
            $name = "Sharestates";
        }

        if($invoice!='' && $from != "LoanServicing@sharestates.com") {
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n".'Reply-To: steven@sharestates.com' . "\r\n";
        }else if($invoice!='' && $from == "LoanServicing@sharestates.com") {
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n".'Reply-To: steven@sharestates.com' . "\r\n". "\r\n". 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }else if($from == "LoanServicing@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }else if($from == "processing@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: processing@sharestates.com' . "\r\n";
        }else if($from == "investors@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: investors@sharestates.com' . "\r\n";
        }else{
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To:Greetings@sharestates.com' . "\r\n";
        }
       
        //'X-Mailer: PHP/' . phpversion();
        if ($cc != '') {
            
            $headers .= 'cc: help@ssapp.support' . "\r\n";
            
        }
        
        if ($bcc != '') {
           
            $headers .= 'Bcc: help@ssapp.support' . "\r\n";
        }

       
        
        $headers .= 'X-Mailer: PHP/' . phpversion();
        
        return mail($to, $subject, $body, $headers);
    }
    function send_role_user_email($from = "Greetings@sharestates.com", $to, $subject, $body,$cc = NULL, $bcc = NULL,$invoice = NULL)
    {
        
        if($invoice!='') {
           $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n". 'Reply-To: steven@sharestates.com' . "\r\n";
        }else{
           //$headers = 'From: Sharestates  <hello@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Kevin@sharestates.com' . "\r\n" . 'Reply-To: Allen@sharestates.com' . "\r\n";
           $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: Greetings@sharestates.com' . "\r\n";

        }
       
        //'X-Mailer: PHP/' . phpversion();
        if ($cc != '') {
            $headers .= 'cc: allen@sharestates.com' . "\r\n";  
        }
        
        if ($bcc != '') {
            // $headers .= 'Bcc: hari.maddali@gmail.com' . "\r\n";
            // $headers .= 'Bcc: prasadcg@gmail.com' . "\r\n";
            $headers .= 'Bcc: help@ssapp.support' . "\r\n";
            
        }
        
        $headers .= 'X-Mailer: PHP/' . phpversion();
        
        return mail($to, $subject, $body, $headers);
    }

    function send_user_email_bcc_ss($from = "Greetings@sharestates.com", $to, $subject, $body, $attachment = NULL, $cc = NULL, $bcc = NULL,$invoice = NULL)
    {
        
        if($invoice!='') {
           $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n".'Reply-To: steven@sharestates.com' . "\r\n";
        }else{
           //$headers = 'From: Sharestates  <hello@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Kevin@sharestates.com' . "\r\n" . 'Reply-To: Allen@sharestates.com' . "\r\n";
           $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: Greetings@sharestates.com' . "\r\n";

        }
       
        //'X-Mailer: PHP/' . phpversion();
        
        
        if ($bcc != '') {
            $headers .= 'Bcc: ss-clearance@anstitle.com' . "\r\n";
          
        }
        
        $headers .= 'X-Mailer: PHP/' . phpversion();
        
        return mail($to, $subject, $body, $headers);
    }
    
     function send_user_email_missing_doc($from = "Greetings@sharestates.com", $to, $subject, $body, $attachment = NULL, $cc = NULL, $bcc = NULL)
    {
        
        
        //$headers = 'From: Sharestates  <hello@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Kevin@sharestates.com' . "\r\n" . 'Reply-To: Allen@sharestates.com' . "\r\n";
        $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: Greetings@sharestates.com' . "\r\n";

        //'X-Mailer: PHP/' . phpversion();
        if ($cc != '') {
            // $headers .= 'cc: hari.maddali@gmail.com' . "\r\n";
            // $headers .= 'cc: prasadcg@gmail.com' . "\r\n";
            $headers .= 'cc: help@ssapp.support' . "\r\n";
            
        }
        
        if ($bcc != '') {
            // $headers .= 'Bcc: hari.maddali@gmail.com' . "\r\n";
            // $headers .= 'Bcc: prasadcg@gmail.com' . "\r\n";
            $headers .= 'Bcc: help@ssapp.support' . "\r\n";
            $headers .= 'Bcc: Allen@sharestates.com' . "\r\n";
        }
        
        $headers .= 'X-Mailer: PHP/' . phpversion();
        
        return mail($to, $subject, $body, $headers);
    }
function send_user_email_missing_doc_test($to, $subject, $body, $attachment = null,$cc = NULL, $bcc = NULL,$bcc2 = NULL)
    {
        
        //  $this->load->library('email');
        //  $this->email->from('info@sharestates.com', 'Sharestates');
        //  $this->email->to($to); 
        //  $this->email->subject($subject);
        //  $this->email->message($body);
        // // print_r($attachment);exit();
        //  if(isset($attachment) && !empty($attachment))
        //  {
        //      //echo "<pre>";var_dump($attachment); echo "</pre>";die();
        //      foreach($attachment as $attach)
        //      {
        //          if($attach!="")
        //          { 
        //              $this->email->attach($attach);
        //          }
        //      }
        //  }
        //  $this->email->send();
        //  $this->email->clear(TRUE);
        
        
        // $path = "./images/".$data['invoice']['invoice_ID'].".pdf";
        //$attachments = array("./images/uploads/resume/");
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $this->email->initialize($config);
        $this->email->from('Greetings@sharestates.com', 'Sharestates');
        //$this->email->reply_to('Kevin@sharestates.com','');
        $this->email->reply_to('Allen@sharestates.com');
        if ($cc != '') {
        $this->email->cc('help@ssapp.support');
        }
        if ($bcc != '') {
       // $ary=array('prinuannie@gmail.com,hemaravi7878@gmail.com');
        $ary=array('help@ssapp.support,Allen@sharestates.com');
        $this->email->bcc($ary);
        }
        if ($bcc2 != '') {
        //$ary=array('prinuannie@gmail.com,hemaravi7878@gmail.com');
        $ary=array('help@ssapp.support');
        $this->email->bcc($ary);
        }
        $this->email->to($to);
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    /*function send_user_email_dev_project($from = "hello@sharestates.com", $to, $subject, $body, $attachment=NULL, $cc=NULL)
    {     
    
    
    $headers = 'From: Sharestates  <hello@sharestates.com>' . "\r\n" .
    'MIME-Version: 1.0' . "\r\n".
    'Content-type: text/html; charset=utf-8' . "\r\n".
    'Reply-To: Kevin@sharestates.com' . "\r\n" .
    'Reply-To: Allen@sharestates.com' . "\r\n" ;
    //'X-Mailer: PHP/' . phpversion();
    if($cc!=''){
    $headers .= 'cc: hari.maddali@gmail.com,allen@sharestates.com,ray@atlantisorganization.com,radni@atlantisorganization.com,brian@sharestates.com,michael@Sharestates.com' . "\r\n";
    $headers .= 'cc: prasadcg@gmail.com' . "\r\n";
    }
    $headers .= 'X-Mailer: PHP/' . phpversion();
    
    return mail($to, $subject, $body, $headers);    
    }*/
    
    function send_user_email_dev_project($from = "Greetings@sharestates.com", $to, $subject, $body, $attachment = NULL, $cc = NULL)
    {
        
        
       // $headers = 'From: Sharestates  <hello@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Kevin@sharestates.com' . "\r\n" . 'Reply-To: Allen@sharestates.com' . "\r\n";
      $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n";
 
        //'X-Mailer: PHP/' . phpversion();
        if ($cc != '') {
            $headers .= 'cc: michael@Sharestates.com' . "\r\n";
            //$headers .= 'cc: prasadcg@gmail.com' . "\r\n";
            $headers .= 'Bcc: allen@sharestates.com,ray@atlantisorganization.com,radni@atlantisorganization.com,jyazel@sharestates.com,help@ssapp.support' . "\r\n";
            //$headers .= 'Bcc: ,hemaravi7878@gmail.com,prasadcg@gmail.com'."\r\n";
            
        }
        $headers .= 'X-Mailer: PHP/' . phpversion();
        
        return mail($to, $subject, $body, $headers);
    }
    
    
    function send_user_email_contact($from = "Greetings@sharestates.com", $to, $subject, $body, $attachment = NULL)
    {
        
        
        $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n" . 'X-Mailer: PHP/' . phpversion();
        
        return mail($to, $subject, $body, $headers);
        
        
    }
    
    
    
    // function get_table($tablename = '', $fields = '', $where = '', $order_by = '', $order = '')
    // {
        
    //     $this->db->where($where);
    //     $this->db->select($fields);
    //     $this->db->from($tablename);
    //     if ($order_by != '' && $order != '') {
    //         $this->db->order_by($order_by, $order);
    //     }
    //     $query  = $this->db->get();
    //     $result = $query->result_array();
    //     // echo $this->db->last_query();exit;
    //     if ($this->db->_error_message())
    //         return FALSE;
    //     else
    //         return $result;
    // } //end function 


    function get_table($tablename = '', $fields = '', $where = '', $order_by = '', $order = '',$protect_identifiers =true)
   {
       
       $this->db->where($where);
       $this->db->select($fields);
       $this->db->from($tablename);
       if ($order_by != '' && $order != '') {
           
           if($protect_identifiers==true){
              
               $this->db->order_by($order_by,$order);
           }else{
               $this->db->_protect_identifiers = FALSE;
               $this->db->order_by($order_by,$order,false);
               $this->db->_protect_identifiers = TRUE;
           }
           
       }
       $query  = $this->db->get();
       $result = $query->result_array();
       // echo $this->db->last_query();exit;
       if ($this->db->_error_message())
           return FALSE;
       else
           return $result;
   } 
    
    
    // function to create data for combobox
    function dropdown_list($table_name, $key, $value, $where)
    {
        $this->_table = $table_name;
        $this->db->where($where);
        return $this->dropdown($key, $value);
    }
    
    
    function get_field_name($tableName, $tblId, $extraCond)
    {
        $tabCount = $this->db->query("SELECT " . $tblId . " FROM " . $tableName . $extraCond);
        $rowValue = $tabCount->row_array();
        if (!empty($rowValue)) {
            return ($rowValue[$tblId]);
        } else {
            return 0;
        } //
    } //end function  
    
    function notes_category()
    {
        return array(
            '-Select-',
            'Billing',
            'Support'
        );
    }
    
    ############################
    # Getting a row from a table
    ############################
    
    function get_row($tablename = '', $fields = '', $where = '')
    {
        
        $this->db->where($where);
        $this->db->select($fields);
        $this->db->from($tablename);
        
        $query  = $this->db->get();
        $result = $query->row_array();
        
        if ($this->db->_error_message())
            return false;
        else
            return $result;
    }
    
    function get_user_by_email($tablename = '', $fields = '', $where = '')
    {
        
        $this->db->limit(1, 0);
        $this->db->order_by('user_id', 'asc');
        $this->db->where($where);
        $this->db->select($fields);
        $this->db->from($tablename);
        
        $query  = $this->db->get();
        $result = $query->row_array();
        
        if ($this->db->_error_message())
            return false;
        else
            return $result;
    }
    
    ###################
    # Create thumbnail
    ####################
    
    function _createThumbnail($fileName, $newimage, $width, $height, $folder)
    {
        $config['image_library']  = 'gd2';
        $config['source_image']   = './uploads/content_images/' . $fileName;
        $config['new_image']      = './uploads/' . $folder . '/' . $newimage;
        $config['create_thumb']   = FALSE;
        $config['maintain_ratio'] = TRUE;
        $config['x_axis']         = 25;
        $config['y_axis']         = 10;
        $config['width']          = $width;
        $config['height']         = $height;
        $this->load->library('image_lib', $config);
        $this->image_lib->initialize($config);
        if (!$this->image_lib->resize()) {
            echo $this->image_lib->display_errors();
        }
        return ($image['file_name']);
    } //end function
    
    // function to create data for combobox
    function insert_all($table_name, $data)
    {
        $this->_table = $table_name;
        return $this->insert_many($data, TRUE);
    }
    
    function insert_one($table_name, $data)
    {
        
        //print_r($data);
        $this->_table = $table_name;
        //return $this->insert($data, TRUE);
        $success      = $this->insert($data, true);
        if ($success)
            return $this->db->insert_id();
        else
            return FALSE;
    }
    
    
    /*********Delete**********/
    
    function delete_all($tablename = '', $where = '')
    {
        $this->db->where($where);
        $this->db->delete($tablename);
        if ($this->db->_error_message())
            return FALSE;
        else
            return TRUE;
    }
    
    
    /*****************UK Postcodes*********************/
    
    function uk_postcodes()
    {
        $this->db->select('*');
        $this->db->from('buying_postcodes');
        //$this->db->group_by('postcode_district');
        $this->db->order_by('postcode_area', 'ASC');
        $query  = $this->db->get();
        $result = $query->result_array();
        if ($this->db->_error_message())
            return FALSE;
        else
            return $result;
    } //end function 
    
    
    function create_video_thumb($in, $out, $width, $height)
    {
        
        $thumb_stdout;
        $errors;
        $retval = 0;
        
        // Delete the file if it already exists
        if (file_exists($out)) {
            unlink($out);
        }
        
        // Use ffmpeg to generate a thumbnail from the movie
        $cmd = "ffmpeg -itsoffset -4 -i $in -vcodec mjpeg -vframes 1 -an -f rawvideo -s " . $width . "x" . $height . " $out 2>&1";
        exec($cmd, $thumb_stdout, $retval);
        
        // Queue up the error for processing
        if ($retval != 0) {
            $errors[] = "FFMPEG thumbnail generation failed";
        }
        
        if (!empty($thumb_stdout)) {
            foreach ($thumb_stdout as $line) {
                /*echo $line . "
                \n";*/
            }
        }
        
        if (!empty($errors)) {
            foreach ($errors as $error) {
                /*echo $error . "
                \n";*/
            }
        }
        
    } //end functoion
    
    //blog listing in footer
    
    function blog_list()
    {
        $query = $this->db->limit(2, 0);
        $query = $this->db->select('*');
        $query = $this->db->from('funds_blog');
        $query = $this->db->get();
        $row   = $query->result_array();
        
        if ($query->num_rows() > 0) {
            $row = $query->result_array();
            return $row;
        } else
            return FALSE;
    } //end function
    //check ip exists
    function check_ip_exists($ip_address)
    {
        $this->db->select('ip_address');
        $this->db->from('funds_visitors');
        $this->db->where('ip_address', $ip_address);
        $query = $this->db->get();
        $row   = $query->result();
        if ($query->num_rows() > 0)
            return $row;
        else
            return FALSE;
    }
    function insert_ip_address($ip_address)
    {
        $this->db->insert('funds_visitors', array(
            'ip_address' => $ip_address,
            'visiting_date' => date('Y-m-d')
        ));
    }
    ##########################
    # validate Contact us
    #########################
    
    function validate_contact($arr_data)
    {
        $arr_validate = array(
            array(
                'field' => 'user_name',
                'label' => 'Name',
                'rules' => 'required'
            ),
            array(
                'field' => 'user_email',
                'label' => 'Email Address',
                'rules' => 'required|valid_email'
            ),
            
            array(
                'field' => 'user_message',
                'label' => 'Message',
                'rules' => 'required'
            )
        );
        
        return $this->validate($arr_data, $arr_validate);
    }
    
    
    function send_custom_mail($to, $subject, $body, $attachment = null)
    {
        
        //  $this->load->library('email');
        //  $this->email->from('info@sharestates.com', 'Sharestates');
        //  $this->email->to($to); 
        //  $this->email->subject($subject);
        //  $this->email->message($body);
        // // print_r($attachment);exit();
        //  if(isset($attachment) && !empty($attachment))
        //  {
        //      //echo "<pre>";var_dump($attachment); echo "</pre>";die();
        //      foreach($attachment as $attach)
        //      {
        //          if($attach!="")
        //          { 
        //              $this->email->attach($attach);
        //          }
        //      }
        //  }
        //  $this->email->send();
        //  $this->email->clear(TRUE);
        
        
        // $path = "./images/".$data['invoice']['invoice_ID'].".pdf";
        //$attachments = array("./images/uploads/resume/");
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->from('Greetings@sharestates.com', 'Sharestates');
        $this->email->to($to);
        $this->email->bcc('help@ssapp.support');
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }

     function send_custom_mail_daily($from,$to, $subject, $body, $attachment = null,$bcc = NULL)
    {
         if($from==""){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }elseif($from == "LoanServicing@sharestates.com"){
            $name = "Sharestates LoanServicing";
        }elseif($from == "processing@sharestates.com"){
            $name = "Sharestates";
        }elseif($from == "investors@sharestates.com"){
            $name = "Sharestates";
        }else{
            $name = "Sharestates";
        }
        //  $this->load->library('email');
        //  $this->email->from('info@sharestates.com', 'Sharestates');
        //  $this->email->to($to); 
        //  $this->email->subject($subject);
        //  $this->email->message($body);
        // // print_r($attachment);exit();
        //  if(isset($attachment) && !empty($attachment))
        //  {
        //      //echo "<pre>";var_dump($attachment); echo "</pre>";die();
        //      foreach($attachment as $attach)
        //      {
        //          if($attach!="")
        //          { 
        //              $this->email->attach($attach);
        //          }
        //      }
        //  }
        //  $this->email->send();
        //  $this->email->clear(TRUE);
        
        
        // $path = "./images/".$data['invoice']['invoice_ID'].".pdf";
        //$attachments = array("./images/uploads/resume/");
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        //$this->email->from('hello@sharestates.com', 'Sharestates');
        $this->email->from($from,$name);
        $this->email->to($to);
        //$this->email->bcc('prasadcg@gmail.com');
        //$this->email->bcc('hari.maddali@gmail.com');
        if($bcc!=""){
           $bcc_array = array('help@ssapp.support'); 
        }
        $this->email->bcc($bcc_array);
        // $this->email->bcc('athira.bharathi@gmail.com');
        // $this->email->bcc('prinu.bharathi@gmail.com');
        $this->email->subject($subject);
        $this->email->message($body);
       // var_dump($this->email->from());die;
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
     function send_custom_mail_daily_bcc($from,$to, $subject, $body, $attachment = null,$bcc = NULL)
    {
         if($from==""){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }elseif($from == "LoanServicing@sharestates.com"){
            $name = "Sharestates LoanServicing";
        }elseif($from == "processing@sharestates.com"){
            $name = "Sharestates";
        }elseif($from == "investors@sharestates.com"){
            $name = "Sharestates";
        }else{
            $name = "Sharestates";
        }
        
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->from($from,$name);
        $this->email->to($to);
        if(!empty($bcc)){
            $this->email->bcc($bcc);
        }
        
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    function send_custom_mail_bcc($from,$to, $subject, $body, $attachment = null,$bcc = NULL)
    {
         if($from==""){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }elseif($from == "LoanServicing@sharestates.com"){
            $name = "Sharestates LoanServicing";
        }elseif($from == "processing@sharestates.com"){
            $name = "Sharestates";
        }elseif($from == "investors@sharestates.com"){
            $name = "Sharestates";
        }else{
            $name = "Sharestates";
        }
      
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->from($from,$name);
        $this->email->to($to);
        $this->email->bcc('help@ssapp.support');
        $this->email->subject($subject);
        $this->email->message($body);
       // var_dump($this->email->from());die;
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    function send_custom_mail_invoice($to, $subject, $body, $attachment = null){
        
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
       // $this->email->from('hello@sharestates.com', 'Sharestates');
        $this->email->from('LoanServicing@sharestates.com','Sharestates LoanServicing');
        $this->email->to($to);
        $this->email->bcc('help@ssapp.support');
        //$this->email->reply_to('allen@sharestates.com','Sharestates');
        $this->email->reply_to('LoanServicing@sharestates.com','Sharestates');
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }

     function send_custom_mail_cc($to, $subject, $body, $attachment = null,$cc=null)
    {
        
       
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $this->email->initialize($config);
        $this->email->from('Greetings@sharestates.com', 'Sharestates');
        $this->email->to($to);
        $this->email->subject($subject);
         $this->email->message($body);
        if($cc!=''){
            $cc_array = array('help@ssapp.support');
            $this->email->cc($cc_array);
            
        }
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    
    function update_fundproject($data, $imagename, $projectid)
    {
        
        $tabCount = $this->db->query("UPDATE funds_dev_project_images SET image_status='$data',project_id='$projectid' WHERE image_name='$imagename'");
        
        
    }
    
    /*function update_fundproject_capital($projectid,$capital_type,$capital_amount,$capital_total,$capital_date,$lien_position,$requested_term) {
    
    $this->db->query("UPDATE funds_devsend_custom_mail_projects SET project_offer_type='$capital_type',project_goal='$capital_amount',total_project_budget='$capital_total',desired_funding_date='$capital_date',lien_position='$lien_position',lien_position='$lien_position',project_estimated_term='$requested_term' WHERE project_id='$projectid'");
    }*/
    /* function update_fundproject_capital($projectid,$capital_type,$capital_amount,$capital_total,$capital_date,$lien_position,$requested_term,$desired_funding_date) {
    //echo $_POST['project_credit_score'];exit();
    $this->db->query("UPDATE funds_dev_projects SET project_offer_type='".$capital_type."',project_goal='".$capital_amount."',total_project_budget='".$capital_total."',desired_funding_date='".$capital_date."',lien_position='".$lien_position."',lien_position='".$lien_position."',project_estimated_term='".$requested_term."',project_credit_score = '".$_POST['project_credit_score']."',project_construction_value = '".$_POST['project_construction_value']."' WHERE project_id='".$projectid."' ");
    // echo $this->db->last_query();exit();
    }*/
    function update_fundproject_capital($projectid, $capital_type, $capital_amount, $capital_total, $capital_date, $lien_position, $requested_term, $desired_funding_date, $value)
    {
        
        $this->db->query("UPDATE funds_dev_projects SET project_offer_type='" . $capital_type . "',project_goal='" . $capital_amount . "',total_project_budget='" . $capital_total . "',desired_funding_date='" . $capital_date . "',lien_position='" . $lien_position . "',lien_position='" . $lien_position . "',project_estimated_term='" . $requested_term . "',project_credit_score = '" . $_POST['project_credit_score'] . "',project_construction_value = '" . $value . "' WHERE project_id='" . $projectid . "' ");
        //echo $this->db->last_query(); exit();
    }
    
    function getfundproject($projectid)
    {
        
        $result = $this->db->query("SELECT image_name,image_id FROM funds_dev_project_images WHERE project_id='$projectid'");
        
        $arrdata = $result->result_array();
        
        return $arrdata;
        
    }
    function insert_fundproject($table_name, $data)
    {
        
        $this->_table = $table_name;
        $result       = $this->insert($data, TRUE);
        $insert_id    = $this->db->insert_id();
        return $insert_id;
    }
    function insert_developer_company_experience($data, $id)
    {
        //print_r($data);exit();
        //$this->_table = $table_name;funds_dev_projects;
        if ($id != '') { //echo 11111;exit();
            $this->db->where('developer_id', $id);
            $this->db->update('funds_developers', $data);
            //$insert_id=$data['developer_id'];
            // $data['developer_id']=$insert_id;
            // $this->db->update('funds_developers_display',$data);
            return true;
            
            
        } else { //echo 2222;exit();
            $result    = $this->db->insert('funds_developers', $data);
            $insert_id = $this->db->insert_id();
            //$data['developer_id']=$insert_id;
            //$this->db->insert('funds_developers_display',$data);
            return $insert_id;
            
        }
        
    }
    
    function insert_developer_company_experience_display($data)
    {
        // print_r($data);exit();
        // if($data['developer_id']!='')
        // {
        //  $this->db->where('developer_id',$data['developer_id']);
        //  $this->db->update('funds_developers_display',$data);
        //  //$insert_id=$data['developer_id'];
        //  return true;
        
        
        // }
        // else
        // {
        $result    = $this->db->insert('funds_developers_display', $data);
        $insert_id = $this->db->insert_id();
        return $insert_id;
        
        //}
        
    }
    
    function update_fundproject_status($data, $projectid)
    {
        // echo $projectid;exit();
        $this->db->query("UPDATE funds_dev_projects SET project_status='" . $data . "' WHERE project_id='" . $projectid . "'");
    }
    
    function update_fundprojectdoc($status, $docname, $doctitle, $projectid)
    {
        
        // echo "UPDATE funds_project_documents SET document_status='$status',project_id='$projectid',document_title='$doctitle' WHERE document_name='$docname'";exit;
        $tabCount = $this->db->query("UPDATE funds_dev_project_documents SET document_status='" . $status . "',project_id='" . $projectid . "',document_title='" . $doctitle . "' WHERE document_name='" . $docname . "'");
        // echo $this->db->last_query();
        return true;
        
    }
    
    function getfundprojectdoc($projectid)
    {
        
        $result = $this->db->query("SELECT document_title,document_id FROM funds_dev_project_documents WHERE project_id='" . $projectid . "'");
        
        $arrdata = $result->result_array();
        
        return $arrdata;
        
    }
    function delete_fundprojectdoc($docid)
    {
        
        $result = $this->db->query("DELETE FROM funds_dev_project_documents WHERE document_id='" . $docid . "'");
        
        //$arrdata=$result->result_array();
        
        return $result;
        
    }
    
    function delete_fundprojectimg($imid)
    {
        
        $result = $this->db->query("DELETE FROM funds_dev_project_images WHERE image_id='$imid'");
        
        //$arrdata=$result->result_array();
        
        return $result;
        
    }
    
    function update_fundproject_company($userid, $asset, $record, $dev_id = NULL)
    {
        // echo $dev_id;exit;
        $result = $this->db->query("UPDATE funds_developers SET asset_management='" . $asset . "',sponsor_track_record='" . $record . "' WHERE user_id='" . $userid . "'");
        if ($dev_id != "") {
            $result = $this->db->query("UPDATE funds_developers_display SET asset_management='" . $asset . "',sponsor_track_record='" . $record . "' WHERE user_id='" . $userid . "' AND developer_id='" . $dev_id . "'");
        }
        // return $result;
    }
    //           function update_fundproject_company_display($userid,$asset,$record,$exp) {
    // //echo $record;exit;
    //      $result=$this->db->query("UPDATE funds_developers SET asset_management='".$asset."',sponsor_track_record='".$record."',sponsor_experience='".$exp."' WHERE user_id='".$userid."'");
    
    //       // return $result;
    //         } 
    
    
    function selectone($tbl, $fld, $val)
    {
        //echo "SELECT * FROM $tbl WHERE $fld='$val'";exit;
        $result  = $this->db->query("SELECT * FROM $tbl WHERE $fld='" . $val . "'");
        $arrdata = $result->result_array();
        // echo $this->db->last_query();
        return $arrdata;
    }
    function selecttwo($tbl, $fld, $val, $fld2, $val2)
    {
        //echo "SELECT * FROM $tbl WHERE $fld='$val'";exit;
        $result  = $this->db->query("SELECT * FROM $tbl WHERE $fld='" . $val . "' AND $fld2='" . $val2 . "'");
        $arrdata = $result->result_array();
        return $arrdata;
    }
    
    function update_many($tbl, $fld, $id, $data)
    {
        
        $this->db->where($fld, $id);
        $this->db->update($tbl, $data);
    }
    function update_s($tbl, $user_email, $user_password, $data)
    {
        
        $this->db->where('user_email', $user_email);
        $this->db->where('user_password', md5($user_password));
        $this->db->update($tbl, $data);
    }
    function get_state()
    {
        //$result = $this->db->get('funds_location');
        $this->db->select('*');
        $this->db->from('funds_location');
        $this->db->order_by('state', 'ASC');
        $result  = $this->db->get();
        return $result->result_array();
    }
    public function getMonths($new_month, $count = 1, $end_month)
    {
        // $new_month='2016-12-31';
        // $end_month='2017-11-29';
        
        $start    = new DateTime($new_month);
        $day      = $start->format('d');
        $month    = $start->format('n');
        $year     = $start->format('Y');
        $end      = new DateTime($end_month);
        $month2   = $end->format('n');
        $day2     = $end->format('d');
        $end_year = $end->format('Y');
        $list     = array();
        //$interval   = new DateInterval(sprintf("P%dM",$count));
        //$list[$start->format("Y")][] =$start->format("F d, Y");
        $start->modify('-1 month');
        // $end->modify('-1 month');
        while ($start < $end) {
            $month1 = $start->format('n');
            $year1  = $start->format('Y');
            
            if ($month1 == '1' && $day > '28') {
                $isleap = $this->isLeapYear($year1);
                if ($isleap == 1) {
                    $start->modify('29 days');
                } else {
                    $start->modify('28 days');
                }
                
                $list[$start->format("Y")][] = $start->format("F t, Y");
            } elseif ($day == '31') {
                $start->modify('30 days');
                $month3 = $start->format('n');
                $year3  = $start->format('Y');
                
                if ($month2 == $month3 && $end_year == $year3) {
                    
                    $list[$start->format("Y")][] = $start->format("F $day2, Y");
                    // return $list;
                } else {
                    $list[$start->format("Y")][] = $start->format("F t, Y");
                }
                
            } else {
                $start->modify('+1 month');
                $list[$start->format("Y")][] = $start->format("F $day, Y");
            }
            //$start->add($interval);
        }
        //echo "<pre>";
        //print_r(array_unique($list));exit;
        return $list;
        
    }
    public function getMonths_quarterly($new_month, $count = 1, $end_month)
    {
        
        
        $start    = DateTime::createFromFormat("Y-m-d", $new_month);
        $end      = DateTime::createFromFormat("Y-m-d", $end_month);
        // echo $new_month; echo '<br/>';
        //echo $end_month; exit;
        //print_r($start);exit;
        $list     = array();
        $interval = new DateInterval(sprintf("P%dM", $count));
        while ($start <= $end) {
            $list[$start->format("Y")][] = $start->format("F d, Y");
            $start->add($interval);
        }
        return $list;
    }
    public function getMonths123($new_month, $count = 1, $end_month)
    {
        $start    = DateTime::createFromFormat("Y-m-d", $new_month);
        $end      = DateTime::createFromFormat("Y-m-d", $end_month);
        $day1     = $start->format('d');
        $year1    = $start->format('Y');
        $end_day  = $end->format('d');
        $end_year = $end->format('Y');
        
        // $month1  = $start->format('n');
        
        // $d1      = cal_days_in_month(CAL_GREGORIAN, $month1, $year1);
        $list     = array();
        $interval = new DateInterval(sprintf("P%dM", $count));
        while ($start <= $end) {
            
            $day   = $start->format('d');
            $month = $start->format('n');
            $year  = $start->format('Y');
            $d     = cal_days_in_month(CAL_GREGORIAN, $get_month, $get_year);
            if ($month == '1' && $day == '31') {
                $feb                         = "February 28, " . $year;
                $feb_date                    = $year . '-02-28';
                $feb_last                    = $year . '-02-31';
                $list[$start->format("Y")][] = $start->format("F d, Y");
                $start                       = DateTime::createFromFormat('Y-m-d', $feb_date);
                $list[$start->format("Y")][] = $start->format("F d, Y"); //$feb;//$start->format("February 28, Y"); 
                $start->add($interval);
                $start->modify('+2 day');
            } else {
                if ($day1 == '31') {
                    //  $start->modify('30 days');
                    
                    $list[$start->format("Y")][] = $start->format("F t, Y");
                    
                } else {
                    $list[$start->format("Y")][] = $start->format("F d, Y");
                }
                $start->add($interval);
            }
        }
        
        return $list;
    }
    function isLeapYear($year)
    {
        
        return (bool) \DateTime::createFromFormat('Y', $year)->format('L');
    }
    
    public function array_values_recursive($ary)
    {
        $lst = array();
        foreach (array_keys($ary) as $k) {
            $v = $ary[$k];
            if (is_scalar($v)) {
                $lst[] = $v;
            } elseif (is_array($v)) {
                $lst = array_merge($lst, $this->array_values_recursive($v));
            }
        }
        return array_values($lst); // used array_value function for rekey
    }
    public function project_sucess_condition()
    {
        
        $project = $this->get_all_project();
        if (!empty($project)) {
            foreach ($project as $proj_det) {
                //print_r($proj_det['project_id']);
                $sum_share = $this->get_share_sum_project($proj_det['project_id']);
                //print_r($sum_share);
                if ($proj_det['project_goal'] <= ($sum_share['amount_new'])) {
                    $arr_data = array(
                        'project_success' => 'Y'
                    );
                    $this->project->update_data($proj_det['project_id'], $arr_data);
                }
            }
        }
        
    }
    function get_all_project()
    {
        $this->db->select("project_id,project_goal");
        $this->db->from("funds_projects");
        $this->db->where("funds_projects.project_status", "A");
        $query  = $this->db->get();
        $result = $query->result_array();
        if ($this->db->_error_message())
            return FALSE;
        else
            return $result;
    }
    function get_share_sum_project($project_id = NULL)
    {
        //    $this->db->select('sum(number_shares) as amount_new');
        // $this->db->from('funds_share_holders');
        //  $this->db->where('funds_share_holders .project_id="'.$project_id.'"');
        //  $query  = $this->db->get();
        $this->db->select('sum(funds_share_holders.number_shares * funds_payments.amount_per_share) as amount_new');
        $this->db->from('funds_share_holders');
        $this->db->join('funds_payments', 'funds_payments.share_holder_id = funds_share_holders.share_holder_id');
        $this->db->where('funds_share_holders .project_id="' . $project_id . '"');
        $this->db->where('(funds_share_holders.sale_status = "A" or funds_share_holders.sale_status = "N" )');
        $this->db->where('funds_share_holders.IsDeleted','N');
        $query  = $this->db->get();
        $result = $query->row_array();
        //echo $this->db->last_query();
        
        if (empty($result)) {
            return FALSE;
        } else {
            //print_r($result);
            return $result;
        }
    }
    
    /* risk category*/
    function get_risk_category()
    {
        $this->db->select('*');
        $this->db->from('funds_risk_category');
        $this->db->order_by('risk_cat_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    /* risk category*/  
    function get_risk_all_category()
    {
        $this->db->select('*');
        $this->db->from('funds_risk_category');
        $this->db->where('risk_sub_cat_id',0);
        $this->db->order_by('risk_cat_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        if(empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    /* risk category*/  
    function get_risk_sub_category($sub_id)
    {
        $this->db->select('*');
        $this->db->from('funds_risk_category');
        $this->db->where('risk_sub_cat_id',$sub_id);
        $this->db->order_by('risk_cat_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        if(empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_risk_tooltip($cat_name)
    {
        $this->db->select('*');
        $this->db->from('funds_risk_category');
        $this->db->where('funds_risk_category .risk_cat_name="' . $cat_name . '"');
        $query  = $this->db->get();
        $result = $query->row_array();
        if (empty($result)) {
            return FALSE;
        } else {
            
            return $result;
        }
    }
    function insert_loan($project_id, $period, $date, $user_id, $amount, $ext_amount, $ext_date)
    {
        
        $this->db->insert('funds_payment_loan', array(
            'project_id' => $project_id,
            'project_extend_loan_period' => $period,
            'user_id' => $user_id,
            'project_extend_loan_date' => $date,
            'payment_amount' => $amount,
            'schedule_amount' => $ext_amount,
            'schedule_date' => $ext_date
        ));
        return true;
    }
    
    
    function dev_portfolio_list($user_id = NULL, $char = NULL, $char_date = NULL)
    {
        
        
        if ($char == 'A')
            $this->db->order_by('funds_projects.project_developer_payment_amount', 'ASC');
        
        if ($char == 'B')
            $this->db->order_by('funds_projects.project_developer_payment_amount', 'DESC');
        
        if ($char_date == 'C')
            $this->db->order_by('funds_projects.project_developer_payment_start_date', 'ASC');
        
        if ($char_date == 'D')
            $this->db->order_by('funds_projects.project_developer_payment_start_date', 'DESC');
        
        $this->db->select('*');
        $this->db->from('funds_projects');
        $this->db->join('funds_developers', 'funds_developers.developer_id = funds_projects.developer_id');
        $this->db->where('funds_developers.developer_id', $user_id);
        $this->db->group_by('funds_projects.project_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        //echo $this->db->last_query();exit;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    
    
    
    function dateDiff($start, $end)
    {
        $start_ts = strtotime($start);
        $end_ts   = strtotime($end);
        $diff     = $end_ts - $start_ts;
        return round($diff / 86400);
    }
    
    function monthDiff($date1, $date2)
    {
        // $ts1 = strtotime($date1);
        // $ts2 = strtotime($date2);
        
        // $year1 = date('Y', $ts1);
        // $year2 = date('Y', $ts2);
        
        // $month1 = date('m', $ts1);
        // $month2 = date('m', $ts2);
        
        // $diff = (($year2 - $year1) * 12) + ($month2 - $month1);
        
        // return $diff;
        
        // $begin = new DateTime( $date1 );
        //    $end = new DateTime( $date2 );
        //    $end = $end->modify( '+1 month' );
        
        //    $interval = DateInterval::createFromDateString('1 month');
        
        //    $period = new DatePeriod($begin, $interval, $end);
        //    $counter = 0;
        //    foreach($period as $dt) {
        //        $counter++;
        //    }
        
        //    return $counter;
        
        $min_date = min($date1, $date2);
        $max_date = max($date1, $date2);
        $i        = 0;
        
        while (($min_date = strtotime("+1 MONTH", $min_date)) <= $max_date) {
            $i++;
        }
        return $i;
    }
    
    function get_ach_details()
    {
        //$date = date('Y-m-d');
         $this->db->select('*,funds_payments.user_id as user_id,sum(fund_bank.bank_routing_num) as route_num,(CASE  WHEN accrual_sale_type="P" THEN payment_amount  ELSE total_payment_amount END) as payment_amount,(CASE  WHEN accrual_sale_type="P" THEN payment_ac_credited  ELSE payment_ac_credited_accrual END) as payment_ac_credited');
        $this->db->from('funds_payments');
        $this->db->join('fund_bank', 'fund_bank.bank_id = funds_payments.bank_id');
        $this->db->where('funds_payments.payment_status != ', 'D');
        $this->db->where('funds_payments.IsDeleted != ', 'Y');
        $this->db->where('funds_payments.wiring', 'A');
        $this->db->where('funds_payments.ach_payment_status', 0);
        $this->db->group_by('funds_payments.payment_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        //echo $this->db->last_query();exit;
        return $result;
    }
    
    function get_ach_schedules()
    {
        //$date = date('Y-m-d');
        $this->db->select('*,sum(fund_bank.bank_routing_num) as route_num');
        $this->db->from(' funds_developer_schedule');
        $this->db->join('fund_bank', 'fund_bank.bank_id =  funds_developer_schedule.payment_bank');
        $this->db->where('funds_developer_schedule.schedule_payment_status', 'U');
        $this->db->where('funds_developer_schedule.payment_bank IS NOT NULL');
        $this->db->where('funds_developer_schedule.schedule_ach_status', 0);
        $this->db->group_by('funds_developer_schedule.dev_schedule_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        return $result;
    }
    
    function get_cashout_details()
    {
        //$date = date('Y-m-d');
        $this->db->select('*,sum(fund_bank.bank_routing_num) as route_num');
        $this->db->from(' funds_distribution_cashout');
        $this->db->join('fund_bank', 'fund_bank.bank_id =  funds_distribution_cashout.bank_name');
        $this->db->where('funds_distribution_cashout.bank_name IS NOT NULL');
        $this->db->where('funds_distribution_cashout.payment_ach_status', 0);
        $this->db->group_by('funds_distribution_cashout.cashout_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        return $result;
    }
    
    function get_share_details()
    {
        $this->db->select('ach_id, project_id, bank_name, bank_route_num, bank_acc_num, bank_acc_name, bank_address, cashout_date, schedule_amount, schedule_date, bank_route_num as route_num'); //sum(schedule_amount) as schedule_amount,
        $this->db->from('funds_share_ach');
        $this->db->where('funds_share_ach.ach_send_status', 0);
        //$this->db->group_by('funds_share_ach.ach_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    
    #--------------------------------------------------Service fee------------------------------------------
    function get_service_details()
    {
        $this->db->select('service_fee_id,bank_name, bank_route_num, bank_acc_num, bank_acc_name, bank_address, cashout_date, schedule_amount, bank_route_num as route_num'); //sum(schedule_amount) as schedule_amount,
        $this->db->from('funds_service_fee');
        $this->db->where('funds_service_fee.ach_send_status', 0);
        //$this->db->group_by('funds_share_ach.ach_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        return $result;
    }
    
    function get_ach_loan_schedules()
    {
        //$date = date('Y-m-d');
        $this->db->select('*,sum(fund_bank.bank_routing_num) as route_num');
        $this->db->from(' funds_developer_loan_schedule');
        $this->db->join('fund_bank', 'fund_bank.bank_id =  funds_developer_loan_schedule.payment_bank');
        $this->db->where('funds_developer_loan_schedule.schedule_payment_status', 'U');
        $this->db->where('funds_developer_loan_schedule.payment_bank IS NOT NULL');
        $this->db->where('funds_developer_loan_schedule.schedule_ach_status', 0);
        $this->db->group_by('funds_developer_loan_schedule.dev_loan_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        //echo $this->db->last_query();exit;
        return $result;
    }
    
    function get_user()
    {
        $this->db->select('*');
        $this->db->from('funds_users');
        $this->db->where('user_id', $this->session->userdata('user_id'));
        $result = $this->db->get();
        return $result->row_array();
    }
    
    function update_schedule_details($schedule_id)
    {
        
        $result = $this->db->query("UPDATE  funds_developer_schedule SET schedule_ach_status = 1  WHERE dev_schedule_id = '" . $schedule_id . "'");
        
    }
    
    function update_cashout_details($cashout_id)
    {
        
        $result = $this->db->query("UPDATE  funds_distribution_cashout SET payment_ach_status = 1  WHERE cashout_id = '" . $cashout_id . "'");
    }
    
    function update_share_details($ach_id)
    {
        
        $result = $this->db->query("UPDATE   funds_share_ach SET ach_send_status = 1  WHERE ach_id = '" . $ach_id . "'");
    }
    
    function get_current_domain()
    {
        
        $url = $_SERVER['REQUEST_URI'];
        $arr = explode('/', $url);
        return $arr[2];
    }
    
    function user_activity($uid = NULL, $msg = NULL, $type)
    {
        $this->db->insert('funds_user_activity', array(
            'user_id' => $uid,
            'activity_message' => $msg,
            'activity_type' => $type,
            'activity_date' => date('Y-m-d')
        ));
        return true;
        
    }
    function get_footer_details($id = 1)
    {
        $this->db->select('*');
        $this->db->from('funds_footer_content');
        $this->db->where('footer_id', $id);
        $result = $this->db->get();
        return $result->row_array();
    }
    
    function update_footer($id, $arr_data)
    {
        $this->db->set($arr_data);
        $this->db->where('footer_id', $id);
        $this->db->update('funds_footer_content');
        return true;
    }
    function get_shareholders($uid, $pid)
    {
        
        $result     = $this->db->query("select funds_share_holders.share_holder_id, funds_share_holders.number_shares from funds_share_holders  WHERE funds_share_holders.user_id ='" . $uid . "' AND funds_share_holders.IsDeleted = 'N' AND funds_share_holders.project_id ='" . $pid . "' ");
        $arr_result = $result->result_array();
        return $arr_result[0];
        
    }
    
    
    
    /* administrator access permission */
    
    function get_admin_access_menu($admin_id)
    {
        $arr_result = $this->db->select('*')->where('admin_id', $admin_id)->order_by('menu_id', 'asc')->get('funds_admin_settings')->result_array();
        $arr_data   = array();
        foreach ($arr_result as $key => $value) {
            $arr_data[] = $value['menu_id']; # code...
        }
        return $arr_data;
    }
    
    
    function get_all_admin_read_menu($admin_id)
    {
        $arr_result = $this->db->select('funds_admin_menu.menu_id as menu_id')->join('funds_admin_menu', 'funds_admin_menu.menu_id = funds_admin_settings.menu_id')->where('funds_admin_menu.menu_sub_id !=', 0)->where('funds_admin_settings.admin_id', $admin_id)->where('funds_admin_settings.settings_read_status', 'Y')->order_by('funds_admin_settings.menu_id', 'asc')->get('funds_admin_settings')->result_array();
        $arr_data   = array();
        foreach ($arr_result as $key => $value) {
            $arr_data[] = $value['menu_id']; # code...
        }
        return $arr_data;
    }
    
    function get_all_admin_write_menu($admin_id)
    {
        $arr_result = $this->db->select('funds_admin_menu.menu_id as menu_id')->join('funds_admin_menu', 'funds_admin_menu.menu_id = funds_admin_settings.menu_id')->where('funds_admin_menu.menu_sub_id !=', 0)->where('funds_admin_settings.admin_id', $admin_id)->where('(funds_admin_settings.settings_write_status = "Y" or funds_admin_menu.menu_status= "B" )')->order_by('funds_admin_settings.menu_id', 'asc')->get('funds_admin_settings')->result_array();
        $arr_data   = array();
        foreach ($arr_result as $key => $value) {
            $arr_data[] = $value['menu_id']; # code...
        }
        return $arr_data;
    }
    /*
    function get_menu_access_status($id,$status=NULL)
    {   
    $arr_menu       = $this->get_admin_access_menu($this->session->userdata('SESS_ADMINID'));
    $arr_read_menu  = $this->get_all_admin_read_menu($this->session->userdata('SESS_ADMINID'));
    
    $arr_write_menu = $this->get_all_admin_write_menu($this->session->userdata('SESS_ADMINID'));
    
    if($status=='R'){
    
    if(in_array($id,$arr_read_menu)){
    return TRUE;
    }else{
    return FALSE;
    }
    
    }else if($status=='W'){
    if(in_array($id,$arr_write_menu)){
    return TRUE;
    }else{
    return FALSE;
    }
    
    }else{
    
    if(in_array($id,$arr_menu)){
    return TRUE;
    }else{
    return FALSE;
    }
    
    }
    }*/
    
    function get_menu_access_status($id, $status = NULL)
    {
        //echo $this->session->userdata('SESS_ADMIN_TYPE');
        $arr_menu       = $this->get_admin_access_menu($this->session->userdata('SESS_ADMINID'));
        $arr_read_menu  = $this->get_all_admin_read_menu($this->session->userdata('SESS_ADMINID'));
        $arr_write_menu = $this->get_all_admin_write_menu($this->session->userdata('SESS_ADMINID'));
        if ($status == 'R') {
            if (in_array($id, $arr_read_menu) || $this->session->userdata('SESS_ADMIN_TYPE') == 'S') {
                return TRUE;
            } else {
                return FALSE;
            }
        } else if ($status == 'W') {
            if (in_array($id, $arr_write_menu) || $this->session->userdata('SESS_ADMIN_TYPE') == 'S') {
                return TRUE;
            } else {
                return FALSE;
            }
        } else {
            if (in_array($id, $arr_menu) || $this->session->userdata('SESS_ADMIN_TYPE') == 'S') {
                return TRUE;
            } else {
                return FALSE;
            }
        }
    }
    
    // invest more status in investment card
    
    function get_user_invest_projects($user_id)
    {
        $arr_result = $this->db->select('funds_share_holders.project_id as project_id')->join('funds_users', 'funds_users.user_id = funds_share_holders.user_id')->where('funds_users.user_id = "' . $user_id . '" or funds_users.parent_user = "' . $user_id . '" ')->get(' funds_share_holders')->result_array();
        $arr_data   = array();
        foreach ($arr_result as $key => $value) {
            $arr_data[] = $value['project_id'];
        }
        return $arr_data;
    }
    
    function check_invest_projects($project_id)
    {
        $arr_project = $this->get_user_invest_projects($this->session->userdata('user_id'));
        if (in_array($project_id, $arr_project)) {
            return TRUE;
        } else {
            return FALSE;
        }
    }
    
    // get user name 
    
    function get_user_name($user_id)
    {
        //echo $user_id;exit;
        $this->db->select('*');
        $this->db->from('funds_users');
        $this->db->where('user_id', $user_id);
        $query  = $this->db->get();
        $result = $query->row_array();
        if ($result['sub_user_type'] == 'E') {
            $name = $result['user_entity_title'];
        } else if ($result['sub_user_type'] == 'J') {
            $name = $result['sub_jacc_first_name'];
        } else if ($result['sub_user_type'] == 'T') {
            $name = $result['nick_name'];
        } else {
            $name = $result['first_name'] . ' ' . $result['last_name'];
        }
        return $name;
        
    }
    
    
    function get_user_first_name($user_id)
    {
        //echo $user_id;exit;
        $this->db->select('*');
        $this->db->from('funds_users');
        $this->db->where('user_id', $user_id);
        $query  = $this->db->get();
        $result = $query->row_array();
        if ($result['sub_user_type'] == 'E') {
            $name = $result['user_entity_title'];
        } else if ($result['sub_user_type'] == 'J') {
            $name = $result['sub_jacc_first_name'];
        } else if ($result['sub_user_type'] == 'T') {
            $name = $result['nick_name'];
        } else {
            $name = $result['first_name'];
        }
        return $name;
        
    }
    
    
    function get_dist_cashout()
    {
        $this->db->select('*');
        $this->db->from('funds_project_distributions');
        $this->db->where('distribution_status = "A" AND distribution_payment_status = ""  AND paper_check != "1" ');
        $query  = $this->db->get();
        $result = $query->result_array();
        //echo $this->db->last_query();exit;
        // print_r($result);exit;
        
        foreach ($result as $data) {
            
            $arr_values = array(
                'user_id' => $data['user_id'],
                'project_id' => $data['project_id'],
                'credit_amount' => (floor($data['distribution_amount'] * 100) / 100),
                'credit_date' => date('Y-m-d'),
                'credit_status' => 'C'
            );
            $this->db->insert('funds_credit_account', $arr_values);
            
            $arr_where = array(
                'distribution_id' => $data['distribution_id']
            );
            $arr_data  = array(
                'distribution_payment_status' => 'R',
                'distribution_status' => 'C'
            );
            $this->db->where($arr_where);
            $this->db->set($arr_data);
            $this->db->update('funds_project_distributions');
            
        }
        
    }
    public function get_count_decimalpoint($value)
    {
        
        if ((int) $value == $value) {
            return 0;
        } else if (!is_numeric($value)) {
            
            return false;
        }
        
        return strlen($value) - strrpos($value, '.') - 1;
        
    }
    
    function dev_schedule_list_payment($project_id,$construction_status=NULL)
    {
        if(!empty($construction_status)){
            $this->db->where("funds_payment_schedule.costruction_draw_status",$construction_status);
        }
        $this->db->select('*,funds_payment_schedule.schedule_status as schedule_status');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_projects', 'funds_projects.project_id = funds_payment_schedule.project_id');
        $this->db->join('funds_developer_schedule', 'funds_developer_schedule.schedule_id = funds_payment_schedule.schedule_id','left');
        $this->db->where('funds_projects.project_id', $project_id);
        //$this->db->where('funds_payment_schedule.schedule_status !=', 'A');
        $this->db->where('(funds_payment_schedule.schedule_status = "C" or (funds_payment_schedule.schedule_status="A" and funds_developer_schedule.schedule_payment_success = "I") )');
        $this->db->order_by('funds_payment_schedule.schedule_id', 'ASC');
        $query  = $this->db->get();
        $result = $query->result_array();
        return $result;
    }
    
    function dev_loan_schedule_list_payment($project_id)
    {
        
        $this->db->select('*');
        $this->db->from('funds_payment_loan');
        $this->db->join('funds_projects', 'funds_projects.project_id = funds_payment_loan.project_id');
        $this->db->join('funds_developer_loan_schedule', 'funds_developer_loan_schedule.loan_id = funds_payment_loan.loan_id','left');
        $this->db->where('funds_projects.project_id', $project_id);
        //$this->db->where('funds_payment_loan.schedule_status !=', 'A');
        $this->db->where('(funds_payment_loan.schedule_status = "C" or (funds_payment_loan.schedule_status="A" and funds_developer_loan_schedule.schedule_payment_success = "I") )');
        $this->db->order_by('funds_payment_loan.loan_id', 'ASC');
        $query  = $this->db->get();
        $result = $query->result_array();
        return $result;
    }
    
    
    function dev_schedule_list_payment_new($project_id)
    {
        
        $this->db->select('*');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_projects', 'funds_projects.project_id = funds_payment_schedule.project_id');
        $this->db->where('funds_projects.project_id', $project_id);
        $this->db->where('funds_payment_schedule.schedule_status', 'A');
        $this->db->order_by('funds_payment_schedule.schedule_id', 'DESC');
        $query  = $this->db->get();
        $result = $query->result_array();
        
        return $result;
        
        
    }
    
    /* 23-09-15*/
    
    /* start- investor email */
    
    function get_shareholder_users()
    {
        $this->db->select("s.share_holder_id,s.user_id,u.parent_user,s.project_id,u.first_name,u.last_name,u.user_email,p.project_type,p.project_type_change_date,u.user_status");
        $this->db->from("funds_share_holders s");
        $this->db->join('funds_projects p', 'p.project_id=s.project_id');
        $this->db->join('funds_users u', 'u.user_id=s.user_id');
        $this->db->join('funds_payments pay', 'pay.share_holder_id=s.share_holder_id', 'left');
        $this->db->where('p.project_status', 'A');
        $this->db->where('p.project_type <>', 'RS');
       /* $this->db->where('p.project_servicing_outsourced' ,"N");*/
        $this->db->where('p.project_dev_payment_due', 'N'); //share_holder_status
        $this->db->where('s.sale_status !="I"');
        $this->db->where('pay.payment_status !=', 'D');
        $this->db->where('s.IsDeleted', 'N');
       // $this->db->where('s.user_id', '5526');
        $this->db->group_by('s.user_id');
        $query = $this->db->get();
        
        $result = $query->result_array();
        //echo $this->db->last_query();exit;
        return $result;
        // $this->
    }
    /*function get_shareholder_investor($project_id,$arr_where=NULL){
    if(!empty($arr_where)){
    $this->db->where($arr_where);
    }
    $this->db->select("s.share_holder_id,s.user_id,s.number_shares,s.project_id,s.user_id,u.first_name,u.user_email,p.project_id,p.project_name,p.project_address,p.project_goal,p.project_type,p.project_developer_payment_start_date,p.project_share,p.project_payoff_date,p.project_close_date,p.project_prepayment_penality,p.project_developer_payment_end_date,p.project_construction_loan,p.project_developer_payment_amount,p.project_late_fee,p.project_default_interest,p.project_payment_frequency,p.fee_total,p.fee_anual_return,s.payement_investor_interest,pay.payement_fund_clear_date,pay.payment_date,pay.amount_per_share,p.project_type_change_date, p.project_extend_loan, p.project_extended_payment_start_date, p.project_extended_payment_end_date,p.accrued_interest,s.payement_investor_interest,u.user_interest_rate");
    $this->db->from("funds_share_holders s");
    $this->db->join('funds_projects p','p.project_id=s.project_id');
    $this->db->join('funds_users u','u.user_id=s.user_id');
    $this->db->join('funds_payments pay','pay.share_holder_id=s.share_holder_id','left');
    $this->db->where('p.project_status','A');
    $this->db->where('p.project_dev_payment_due','N');
    $this->db->where('s.sale_status !="I"');
    $this->db->where('pay.payment_status !=','D');
    $query=$this->db->get();
    
    $result=$query->result_array();
    //echo $this->db->last_query();exit;
    return  $result;
    // $this->
    }*/
    function get_shareholder_investor($project_id, $user_id = NULL)
    {
        /*if(!empty($arr_where)){
        $this->db->where($arr_where);
        }*/
        $this->db->select("s.share_holder_id,s.user_id,s.number_shares,s.project_id,s.user_id,u.first_name,u.sub_user_type,u.nick_name,u.user_email,p.project_servicing_fee,p.project_id,p.project_name,p.project_address,p.project_goal,p.project_type,p.project_developer_payment_start_date,p.project_share,p.project_payoff_date,p.project_close_date,p.project_prepayment_penality,p.project_developer_payment_end_date,p.project_construction_loan,p.project_developer_payment_amount,p.project_late_fee,p.project_default_interest,p.project_payment_frequency,p.fee_total,p.fee_anual_return,s.payement_investor_interest,pay.payement_fund_clear_date,pay.payment_date,pay.amount_per_share,p.project_type_change_date, p.project_extend_loan, p.project_extended_payment_start_date, p.project_extended_payment_end_date,p.accrued_interest,s.payement_investor_interest,u.user_interest_rate");
        $this->db->from("funds_share_holders s");
        $this->db->join('funds_projects p', 'p.project_id=s.project_id');
        $this->db->join('funds_users u', 'u.user_id=s.user_id');
        $this->db->join('funds_payments pay', 'pay.share_holder_id=s.share_holder_id', 'left');
        $this->db->where('p.project_status', 'A');
        $this->db->where('p.project_type <>', 'RS');
        $this->db->where('p.project_dev_payment_due', 'N');
        $this->db->where('p.project_servicing_outsourced' ,"N");
        $this->db->where('(s.user_id = ' . $user_id . ' or u.parent_user = ' . $user_id . ' )');
        //$this->db->where('(s.user_id = ' . $user_id . ' or u.parent_user = ' . $user_id . ' )');
        $this->db->where('s.sale_status !="I"');
        $this->db->where('s.IsDeleted','N');
        $this->db->where('pay.payment_status !=', 'D');
        $this->db->where('pay.IsDeleted !=', 'Y');
        $this->db->where('s.share_holder_id not in (select share_holder_id from funds_project_distributions d where (d.distribution_return_status="PR" and d.full_principal_status="1" AND distribution_partial_status = "N") OR (s.number_shares="0" AND s.partial_loan_status="1"))');
        $this->db->order_by('u.user_id', ASC);
        $query = $this->db->get();
        
        $result = $query->result_array();
        //echo $this->db->last_query();//exit;
        return $result;
        // $this->
    }
    function status_dev_schedule_list($project_id, $shedule_status = NULL, $draw_status = NULL, $order_staus = NULL, $type)
    {
        if (!empty($draw_status)) {
            $this->db->where($draw_status);
        }else{
            $this->db->where('(p.project_construction_loan = y.costruction_draw_status)');
        }
        if ($shedule_status != "") {
            $this->db->where('y.schedule_status', $shedule_status);
        }
        
        $this->db->select('y.schedule_id,y.user_id,y.project_id,y.schedule_amount,
            y.schedule_date,y.schedule_status,y.payment_default_fee,
            y.payment_late_fee,y.payment_principal_amount,
            y.costruction_draw_status,y.payment_clearance_date,
            y.perdiem_amount,perdiem_status,d.schedule_payment_success');
        $this->db->from('funds_payment_schedule y');
        $this->db->join('funds_projects p', 'p.project_id = y.project_id');
        $this->db->join('funds_developer_schedule d','d.schedule_id = y.schedule_id','left');
        $this->db->where('p.project_id', $project_id);
        if (!empty($order_staus)) {
            $this->db->order_by($order_staus, $type);
        }
        $query  = $this->db->get();
        $result = $query->result_array();
        return $result;
        
        
    }
    function invesoremail_status_devschedule_list($project_id, $shedule_status = NULL, $draw_status = NULL, $order_staus = NULL, $type)
    {
        if (!empty($draw_status)) {
            $this->db->where($draw_status);
        }
        if ($shedule_status != "") {
            $this->db->where('y.schedule_status', $shedule_status);
        }
        
        $this->db->select('y.schedule_id,y.user_id,y.project_id,y.schedule_amount,y.schedule_date,y.schedule_status,y.payment_default_fee,y.payment_late_fee,y.payment_principal_amount,y.costruction_draw_status,y.payment_clearance_date');
        $this->db->from('funds_payment_schedule y');
        $this->db->join('funds_projects p', 'p.project_id = y.project_id');
        
        $this->db->where('p.project_id', $project_id);
        if (!empty($order_staus)) {
            $this->db->order_by($order_staus, $type);
        }
        
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        return $result;
        
        
    }
    
    function status_loan_schedule_list($project_id, $shedule_status = NULL, $draw_status = NULL, $order_staus = NULL, $type)
    {
        if ($shedule_status != "") {
            $this->db->where('y.schedule_status', $shedule_status);
        }
        
        $this->db->select('y.loan_id,y.user_id,y.project_id,y.schedule_amount,
            y.schedule_date,y.schedule_status,y.payment_default_fee,
            y.payment_late_fee,y.payment_principal_amount,
            y.payment_clearance_date,d.schedule_payment_success');
        $this->db->from('funds_payment_loan y');
        $this->db->join('funds_projects p', 'p.project_id = y.project_id');
        $this->db->join('funds_developer_loan_schedule d','d.loan_id = y.loan_id','left');
        $this->db->where('p.project_id', $project_id);
        
        if (!empty($order_staus)) {
            $this->db->order_by($order_staus, $type);
            
        }
        
        $query  = $this->db->get();
        $result = $query->result_array();
        
        return $result;
        
        
    }
    function get_share_distribution_rate_home($project_id = NULL, $share_holder_id = NULL)
    {
        $this->db->select("*");
        $this->db->from('funds_generate_distribution');
        $this->db->where('funds_generate_distribution.project_id', $project_id);
        $this->db->where('funds_generate_distribution.share_holder_id', $share_holder_id);
        $this->db->order_by('funds_generate_distribution.generate_id', 'DESC');
        $query  = $this->db->get();
        $result = $query->result_array();
        //echo $this->db->last_query();exit;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_num_of_share_dist_test($share_id = NULL)
    {
        $this->db->select("*");
        $this->db->from("funds_share_holders");
        $this->db->join('funds_projects', 'funds_projects.project_id=funds_share_holders.project_id');
        $this->db->where("funds_share_holders.share_holder_id", $share_id);
        $this->db->where("funds_share_holders.IsDeleted",'N');
        $query  = $this->db->get();
        $result = $query->row_array();
        
        // echo $this->db->last_query();exit;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    
    function get_user_maxdate_check($project_id)
    {
        $res    = $this->db->query("SELECT CASE WHEN (`payement_fund_clear_date` IS NULL or payement_fund_clear_date = '0000-00-00') THEN MAX(CAST(payment_date AS CHAR)) ELSE MAX(CAST(payement_fund_clear_date AS CHAR)) END AS max_dat from funds_payments where project_id='" . $project_id . "' AND payment_status!='D' AND (payement_fund_clear_date!='0000-00-00' or payment_date != '0000-00-00')");
        $result = $res->row_array();
        //echo $this->db->last_query();exit;
        return $result;
    }
    /* end- investor email */
    
    
    function get_email_doc()
    {
        
        $this->db->select('*,funds_project_status_doc.project_id as project_id');
        $this->db->from('funds_project_status_doc');
        $this->db->join('funds_dev_projects', 'funds_dev_projects.project_id=funds_project_status_doc.project_id', 'left');
        $this->db->where('doc_date', date('Y-m-d'));
        $result = $this->db->get();
        return $result->result_array();
    }
    function get_investor_accural_date($project_id, $user_id = NULL)
    {
        $res    = $this->db->query("SELECT CASE WHEN (funds_payments.`payement_fund_clear_date` IS NULL or funds_payments.payement_fund_clear_date = '0000-00-00') THEN MAX(CAST(funds_payments.payment_date AS CHAR)) ELSE MAX(CAST(funds_payments.payement_fund_clear_date AS CHAR)) END AS max_dat from funds_payments join funds_projects on funds_projects.project_id = funds_payments.project_id  where funds_payments.project_id='" . $project_id . "' AND funds_payments.payment_status!='D' AND (funds_payments.payement_fund_clear_date!='0000-00-00' AND funds_payments.payment_date != '0000-00-00') order by funds_payments.payment_id DESC ");
        $result = $res->row_array();
        //echo $this->db->last_query();exit;
        return $result;
    }
    function get_investor_leastdate($project_id, $user_id)
    {
        $res    = $this->db->query("SELECT payment_date, CASE WHEN (`payement_fund_clear_date` IS NULL or payement_fund_clear_date = '0000-00-00') THEN MIN(CAST(payment_date AS CHAR)) ELSE MIN(CAST(payement_fund_clear_date AS CHAR)) END AS min_dat from funds_payments where project_id='" . $project_id . "' AND payment_status!='D' AND (payement_fund_clear_date!='0000-00-00' AND payment_date != '0000-00-00') AND user_id='" . $user_id . "'");
        $result = $res->row_array();
        // echo $this->db->last_query();exit;
        return $result;
    }
    function generate_distribution_details_new($share_id = NULL, $schedule_date = NULL)
    {
        
        $res = $this->db->query("SELECT A.*,A.share_holder_id as shar ,B.*,funds_users.* FROM funds_share_holders A LEFT JOIN (select * from funds_generate_distribution where DATE(funds_generate_distribution.schedule_date)='" . date('Y-m-d', strtotime($schedule_date)) . "') B ON A.share_holder_id = B.share_holder_id JOIN funds_users  ON funds_users.user_id=A.user_id where A.share_holder_id='" . $share_id . "' ");
        
        $result = $res->result_array();
        //echo $this->db->last_query();exit;
        return $result;
        
    }
    
    function send_email_attach($to, $subject, $body, $attachment = NULL)
    {
        $from = "Greetings@sharestates.com";
        //echo $from."".$to;die;
        $this->load->library('email');
        $this->email->clear(TRUE);
        
        $this->email->from($from, 'Sharestates');
        $this->email->to($to);
        //$this->email->to($cc);
        $this->email->subject($subject);
        $this->email->message($body);
        $this->email->set_mailtype('html');
        $this->email->attach($attachment);
        $this->email->send();
    }
    function send_email_attach_bcc($to, $subject, $body, $attachment = NULL, $bccarray=NULL, $multi_attachment = NULL, $ccarray=NULL,$from=NULL){

        if($from=="draws@sharestates.com"){
            $from = "draws@sharestates.com";
            $name = "Sharestates Draws";
        }
        elseif($from=="payoffs@sharestates.com"){
            $from = "payoffs@sharestates.com";
            $name = "Sharestates Payoff";
        }
        elseif($from=="Greetings@sharestates.com"){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }
        else{
            $from = "LoanServicing@sharestates.com";
            $name = "Sharestates LoanServicing";
        }

        $this->load->library('email');
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->clear(TRUE);
        $this->email->from($from, $name);
        $this->email->to($to);
        if(!empty($bccarray)){
            $this->email->bcc($bccarray);
        }
        if(!empty($ccarray)){
            $this->email->cc($ccarray);
        }
        $this->email->subject($subject);
        $this->email->message($body);
        //$this->email->set_mailtype('html');
        if(!empty($attachment)){
            $this->email->attach($attachment);
        }
        if (isset($multi_attachment) && !empty($multi_attachment)) {
            foreach ($multi_attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }

    function send_email_attach_sales($to, $subject, $body, $attachment = NULL, $bccarray=NULL, $multi_attachment = NULL, $ccarray=NULL){
        $from = "sales@sharestates.com";
        $this->load->library('email');
        $this->email->clear(TRUE);
        $this->email->from($from, 'Sharestates');
        $this->email->to($to);
        if(!empty($bccarray)){
            $this->email->bcc($bccarray);
        }
        if(!empty($ccarray)){
            $this->email->cc($ccarray);
        }
        $this->email->subject($subject);
        $this->email->message($body);
        $this->email->set_mailtype('html');
        $this->email->attach($attachment);
        if (isset($multi_attachment) && !empty($multi_attachment)) {
            foreach ($multi_attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    
    function payment_status($date, $project_dev_payment_due, $project_dev_payment_charge_off, $project_late_fee, $project_default_interest, $project_type, $pydate, $sch_status, $amt)
    {
       // echo $pydate;
        
        $project_schedule_date      = strtotime(date('Y-m-d', strtotime($date)));
        $project_schedule           = date('Y-m-d', strtotime($date));
        $project_grace_end_date     = strtotime(date('Y-m-d', strtotime($project_schedule . ' + 19 day')));
        $project_default_start_date = strtotime(date('Y-m-d', strtotime($project_schedule . ' + 30 day')));
        $project_default_end_date   = strtotime(date('Y-m-d', strtotime($project_schedule . ' + 60 day')));
        $cur_date                   = strtotime(date('Y-m-d'));
        
        $investor_date              = date('Y-m-d', strtotime(date('Y-m-d')));
        $current_payment_date       = strtotime($investor_date);
        if ($project_dev_payment_due != 'Y' && $project_dev_payment_charge_off != 'Y' && $date != "") {
            
            if ($project_type != 'PC') {
                if ($sch_status == 'C') {
                    if (($current_payment_date > $project_grace_end_date) && ($current_payment_date <= $project_default_start_date)) {
                        $status      = "Past Due";
                        // $late_fee = $amt * ($data['project_late_fee']/100); 
                        $late_fee    = $amt * ($project_late_fee / 100);
                        $default_fee = '';
                    } else if (($current_payment_date > $project_default_start_date) && ($current_payment_date <= $project_default_end_date)) {
                        $status      = "Past Due";
                        $late_fee    = $amt * ($project_late_fee / 100);
                        $default_fee = '';
                    } else if (($current_payment_date > $project_grace_end_date) && ($current_payment_date > $project_default_end_date)) {
                        $status   = "Default";
                        //$default_fee = $amt * ($data['project_default_interest']/100); 
                        //$late_fee = '';
                        $late_fee = $amt * ($project_late_fee / 100);
                    } else {
                        if (($cur_date >= $project_schedule_date) && $date != ''  ){
                            $status      = "Grace Period";
                            $late_fee    = '';
                            $default_fee = '';
                        } else {
                            $status      = "Current";
                            $late_fee    = '';
                            $default_fee = '';
                        }
                    }
                } else {
                    $status = "Current";
                }
            } else {
                
                $status = 'Paid';
            }
            
            // $result['status'] = $current_payment_date.'/'.$project_schedule_date.'/'.$date.'/'.$pydate;
            
            
        } else {
            
            $status = "Current";
        }
        $result['status']      = $status;
        $result['late_fee']    = $late_fee;
        $result['default_fee'] = $default_fee;
        return $result;
        
    }

     function payment_status_invest($date, $project_dev_payment_due, $project_dev_payment_charge_off, $project_late_fee, $project_default_interest, $project_type, $pydate, $sch_status, $amt){
        
        
        $project_schedule_date      = strtotime(date('Y-m-d', strtotime($date)));
        $project_schedule           = date('Y-m-d', strtotime($date));
        $project_grace_end_date     = strtotime(date('Y-m-d', strtotime($project_schedule . ' + 19 day')));
        $project_default_start_date = strtotime(date('Y-m-d', strtotime($project_schedule . ' + 30 day')));
        $project_default_end_date   = strtotime(date('Y-m-d', strtotime($project_schedule . ' + 60 day')));
        $cur_date                   = strtotime(date('Y-m-d'));
        $investor_date              = date('Y-m-d', strtotime(date('Y-m-d')));
        $current_payment_date       = strtotime($investor_date);
        if ($project_dev_payment_due != 'Y' && $project_dev_payment_charge_off != 'Y' && $date != "") {
            
          
                if ($sch_status == 'C') {
                    if (($current_payment_date > $project_grace_end_date) && ($current_payment_date <= $project_default_start_date)) {
                        $status      = "Past Due";
                        // $late_fee = $amt * ($data['project_late_fee']/100); 
                        $late_fee    = $amt * ($project_late_fee / 100);
                        $default_fee = '';
                    } else if (($current_payment_date > $project_default_start_date) && ($current_payment_date <= $project_default_end_date)) {
                        $status      = "Past Due";
                        $late_fee    = $amt * ($project_late_fee / 100);
                        $default_fee = '';
                    } else if (($current_payment_date > $project_grace_end_date) && ($current_payment_date > $project_default_end_date)) {
                        $status   = "Default";
                        //$default_fee = $amt * ($data['project_default_interest']/100); 
                        //$late_fee = '';
                        $late_fee = $amt * ($project_late_fee / 100);
                    } else {
                        if (($cur_date > $project_schedule_date) && $date != '' && $pydate == '') {
                            $status      = "Grace Period";
                            $late_fee    = '';
                            $default_fee = '';
                        } else {
                            $status      = "Current";
                            $late_fee    = '';
                            $default_fee = '';
                        }
                    }
                } else {
                    $status = "Current";
                }
        } else {
            
            $status = "Current";
        }
        $result['status']      = $status;
        $result['late_fee']    = $late_fee;
        $result['default_fee'] = $default_fee;
        return $result;
        
    }
    function payment_status_report($date, $project_dev_payment_due, $project_dev_payment_charge_off, $project_late_fee, $project_default_interest, $project_type, $pydate, $sch_status, $amt, $project_goal, $cur_date = NULL)
    {
        
        //echo  $sch_status;
        $project_schedule_date      = strtotime(date('Y-m-d', strtotime($date)));
        $project_schedule           = date('Y-m-d', strtotime($date));
        $project_grace_end_date     = strtotime(date('Y-m-d', strtotime($project_schedule . ' + 19 day')));
        $project_default_start_date = strtotime(date('Y-m-d', strtotime($project_schedule . ' + 30 day')));
        $project_default_end_date   = strtotime(date('Y-m-d', strtotime($project_schedule . ' + 60 day')));
        /*         if($cur_date==''){
        $cur_date                    = strtotime(date('Y-m-d'));}else{*/
        $cur_date                   = strtotime($cur_date);
        //}
        $investor_date              = date('Y-m-d', strtotime(date('Y-m-d')));
        $current_payment_date       = strtotime($investor_date);
        if ($project_dev_payment_due != 'Y' && $project_dev_payment_charge_off != 'Y' && $date != "") {
            
            if ($project_type != 'PC') {
                if ($sch_status == 'C') {
                    
                    if (($current_payment_date > $project_grace_end_date) && ($current_payment_date <= $project_default_start_date)) {
                        
                        $status      = "Past Due";
                        // $late_fee = $amt * ($data['project_late_fee']/100); 
                        $late_fee    = $amt * ($project_late_fee / 100);
                        $default_fee = '';
                        //echo   $late_fee;exit();
                    } else if (($current_payment_date > $project_default_start_date) && ($current_payment_date <= $project_default_end_date)) {
                        $status      = "Past Due";
                        $late_fee    = $amt * ($project_late_fee / 100);
                        $default_fee = '';
                        
                    } else if (($current_payment_date > $project_grace_end_date) && ($current_payment_date > $project_default_end_date)) {
                        
                        $status      = "Default";
                        $default_fee = (($project_goal * ($project_default_interest / 100)) / 12) - $amt;
                        //$default_fee = $amt * ($data['project_default_interest']/100); 
                        //$late_fee = '';
                        /*if($pr_id=='125'){
                        echo $project_default_interest;exit();
                        }*/
                        $late_fee    = $amt * ($project_late_fee / 100);
                    } else {
                        if (($cur_date > $project_schedule_date) && $date != '' && $pydate == '') {
                            $status      = "Grace Period";
                            $late_fee    = '';
                            $default_fee = '';
                        } else {
                            $status      = "Current";
                            $late_fee    = '';
                            $default_fee = '';
                        }
                    }
                } else {
                    //$late_fee      = $amt * ($project_late_fee/100);
                    // $default_fee =(($project_goal * ($project_default_interest/100))/12)-$amt;
                    
                    $status = "Paid";
                }
            } else {
                
                $status = 'Paid';
            }
            
            // $result['status'] = $current_payment_date.'/'.$project_schedule_date.'/'.$date.'/'.$pydate;
            
            
        } else {
            
            $status = "Current";
        }
        $result['status']      = $status;
        $result['late_fee']    = $late_fee;
        $result['default_fee'] = $default_fee;
        return $result;
        
    }
    function get_details_loan_schedule($uid = NULL)
    {
        
        $res    = $this->db->query("SELECT A.*,funds_projects.*, funds_payments.amount_per_share FROM (select * from `funds_payment_loan` where schedule_status = 'C' order by loan_id ASC)A JOIN `funds_projects` ON `funds_projects`.`project_id` = A.`project_id` JOIN `funds_share_holders` ON funds_share_holders.`project_id` = `funds_projects`.`project_id` JOIN `funds_payments` ON  `funds_payments`.`share_holder_id` = `funds_share_holders`.`share_holder_id`  JOIN `funds_users` ON `funds_users`.`user_id` = `funds_share_holders`.`user_id` WHERE (`funds_users`.user_id='" . $uid . "' OR funds_users.parent_user='" . $uid . "') AND funds_share_holders.IsDeleted = 'N' AND funds_projects.project_extend_loan = 'Y' GROUP BY A.`project_id` ");
        $result = $res->result_array();
        return $result;
    }
    
    public function customerio_change_status($type = NULL, $customer_id = NULL)
    {
        $rand           = rand();
        $session        = curl_init();
        //$customer_id = 'user_'.$rand; // You'll want to set this dynamically to the unique id of the user
        $customerio_url = 'https://track.customer.io/api/v1/customers/';
        $site_id        = '52fc2931d35edfcc2865';
        $api_key        = 'ea2bbf7a24d3c78be97e';
        
        $user_details  = $this->common->get_row('funds_users', 'user_id,first_name,last_name,user_email,is_developer', array(
            'user_id' => $customer_id
        ));
        $customer_name = $user_details['first_name'] . " " . $user_details['last_name'];
        if ($user_details['is_developer'] == "Y" && $type == "active") {
            $name = "is_developer";
        } else {
            $name = $type;
        }
        
        $data = array(
            "email" => $user_details['user_email'],
            "first_name" => $customer_name,
            "plan_name" => $name,
            "email_verified" => "True",
            "created_at" => time()
        );
        // Creates or updates a user with the ID 1337, email test@example.com and a created_at timestamp
        curl_setopt($session, CURLOPT_URL, $customerio_url . $customer_id);
        curl_setopt($session, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($session, CURLOPT_HTTPGET, 1);
        curl_setopt($session, CURLOPT_HEADER, false);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($session, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($session, CURLOPT_VERBOSE, 1);
        curl_setopt($session, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
        
        curl_setopt($session, CURLOPT_USERPWD, $site_id . ':' . $api_key);
        
        curl_exec($session);
        curl_close($session);
        
    }
    
    public function customerio_add_user($type = NULL, $customer_id = NULL)
    {
        $rand           = rand();
        $session        = curl_init();
        //$customer_id = 'user_'.$rand; // You'll want to set this dynamically to the unique id of the user
        $customerio_url = 'https://track.customer.io/api/v1/customers/';
        $site_id        = '52fc2931d35edfcc2865';
        $api_key        = 'ea2bbf7a24d3c78be97e';
        
        $user_details  = $this->common->get_row('funds_users', 'user_id,first_name,last_name,user_email,is_developer', array(
            'user_id' => $customer_id
        ));
        $customer_name = $user_details['first_name'] . " " . $user_details['last_name'];
        if ($user_details['is_developer'] == "Y" && $type == "active") {
            $name = "is_developer";
        } else {
            $name = $type;
        }
        
        $data = array(
            "email" => $user_details['user_email'],
            "first_name" => $customer_name,
            "plan_name" => $name,
            "email_verified" => "False",
            "created_at" => time()
        );
        // Creates or updates a user with the ID 1337, email test@example.com and a created_at timestamp
        curl_setopt($session, CURLOPT_URL, $customerio_url . $customer_id);
        curl_setopt($session, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
        curl_setopt($session, CURLOPT_HTTPGET, 1);
        curl_setopt($session, CURLOPT_HEADER, false);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($session, CURLOPT_CUSTOMREQUEST, 'PUT');
        curl_setopt($session, CURLOPT_VERBOSE, 1);
        curl_setopt($session, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($session, CURLOPT_SSL_VERIFYPEER, false);
        
        curl_setopt($session, CURLOPT_USERPWD, $site_id . ':' . $api_key);
        
        curl_exec($session);
        curl_close($session);
        
    }
    
    
    
    function get_prepayment_penality($project_id, $prepayment_penality)
    {
        
        $this->db->select("*");
        $this->db->from('funds_payment_schedule');
        $this->db->where('funds_payment_schedule.project_id', $project_id);
        $this->db->where('funds_payment_schedule.schedule_status', 'A');
        $this->db->where('funds_payment_schedule.payoff_status <>', 'Y');
        $this->db->order_by('funds_payment_schedule.schedule_date', 'ASC');
        $query  = $this->db->get();
        $result = $query->result_array();
        $count  = count($result);
        
        if ($count >= $prepayment_penality) {
            $arr_result = '0';
        } else {
            $arr_result = $prepayment_penality - $count;
        }
        
        return $arr_result;
        
        
    }
    
    function calc_interest_rate_old1($gross_rtrn = NULL, $net_rtrn = NULL, $user_intrst = NULL, $prjt_id = NULL, $uid = NULL)
    {
        
        if ($user_intrst == 0 || $user_intrst == '') {
            $whr          = array(
                'user_id' => $uid
            );
            $user_details = $this->get_row('funds_users', 'user_id,parent_user,user_interest_rate,user_floor_rate', $whr);
            $arr_whr      = array(
                'user_id' => $user_details['parent_user']
            );
            $parent_user  = $user_details = $this->get_row('funds_users', 'user_id,user_interest_rate,user_floor_rate', $arr_whr);
            //echo $this->db->last_query();
            $user_intrst  = $parent_user['user_interest_rate'];

            if($user_details['user_floor_rate']!="" && $user_details['user_floor_rate']!=0){
              $user_intrst  = $user_details['user_floor_rate'];
            }
        }
        if ($net_rtrn >= $user_intrst) {
            $interest = $net_rtrn;
        } else {
            $interest = $user_intrst;
        }
        
        if ($gross_rtrn >= $interest) {
            $rate = $interest;
        } else {
            $rate = $gross_rtrn;
        }
        return $rate;
        
    }
    function calc_interest_rate($gross_rtrn = NULL, $net_rtrn = NULL, $user_intrst = NULL, $prjt_id = NULL, $uid = NULL){
        $whr          = array('user_id' => $uid);
        $user_details = $this->get_row('funds_users', 'user_id,parent_user,user_interest_rate,user_floor_rate', $whr);   
        
        if($user_details['user_floor_rate']!="" && $user_details['user_floor_rate']!=0){
            $user_intrst  = $user_details['user_floor_rate'];
        }
        if($user_intrst == 0 || $user_intrst == '') {
            $interest = $net_rtrn;
        }else{
            $interest = $user_intrst; 
        }
        
        if ($gross_rtrn >= $interest) {
            $rate = $interest;
        } else {
            $rate = $gross_rtrn;
        }
        return $rate;
    }

    function calc_interest_rate_mailout($gross_rtrn = NULL, $net_rtrn = NULL, $user_intrst = NULL, $prjt_id = NULL, $uid = NULL)
    {
        
        
        if ($net_rtrn >= $user_intrst) {
            $interest = $net_rtrn;
        } else {
            $interest = $user_intrst;
        }
        
        if ($gross_rtrn >= $interest) {
            $rate = $interest;
        } else {
            $rate = $gross_rtrn;
        }
        return $rate;
        
    }
    
    //  Interest rate comparison
    function compare_interest_rate($prjt_id = NULL, $uid = NULL, $current_feetotal = NULL)
    {
        
        $user_details    = $this->common->get_row('funds_users', 'user_id,parent_user,user_interest_rate,gross_interest_rate,user_servicefee_override,user_floor_rate', array(
            'user_id' => $uid
        ));
        $project_details = $this->common->get_row('funds_projects', 'accrued_interest,fee_anual_return,fee_total,project_servicing_fee', array(
            'project_id' => $prjt_id
        ));
        $user_intrst     = $user_details['user_interest_rate'];
        $net_rtrn        = $project_details['fee_total'];
        $gross_rtrn      = $project_details['fee_anual_return'];
        $floor_rate      = $user_details['user_floor_rate']; 
        
        if($floor_rate!="" && $floor_rate!=0){
           $user_intrst  = $floor_rate;
        }
        if ($project_details['accrued_interest'] != 0 && $project_details['accrued_interest'] != 0.00) {
            $current_interest_rate = $this->investor_accured_interest_calc($project_details['fee_anual_return'], $net_rtrn, $project_details['accrued_interest']);
            $gross_rtrn            = $gross_rtrn + $project_details['accrued_interest'];
        } else {
            $current_interest_rate = $this->calc_interest_rate($gross_rtrn, $net_rtrn, $user_intrst, $prjt_id, $uid);
        }
        if ($current_feetotal != "") {
            $current_interest_rate = $current_feetotal;
        }
        if (($user_details['user_servicefee_override'] != "" && $user_details['user_servicefee_override'] != 0) && ($floor_rate =="" || $floor_rate==0) ) {
            $compare_rate = $project_details['project_servicing_fee'] * ($user_details['user_servicefee_override'] / 100);
            $interest     = $current_interest_rate + $compare_rate;
            
        } elseif (($user_details['gross_interest_rate'] != "" && $user_details['gross_interest_rate'] != 0) && ($floor_rate =="" || $floor_rate==0)) {
            $compare_rate   = $gross_rtrn * ($user_details['gross_interest_rate'] / 100);
            $share_interest = $compare_rate;
            $interest       = $gross_rtrn - $share_interest;
            if ($current_feetotal > $interest) {
                $interest = $current_feetotal;
            }
        } else {
            $interest = $current_interest_rate;
            if ($current_feetotal != "") {
                $interest = $current_feetotal;
            }
        }

        //Service Fee Waiver (Property Type/Loan Purpose)
        $total_sfw = $this->service_fee_waiver($prjt_id,$uid,$user_details['override_status']);
        if($user_details['override_status']=="Add"){
            $interest = $interest+$total_sfw;
        }elseif($user_details['override_status']=="Over"){
            $interest = $total_sfw;
        }
        
        if ($gross_rtrn >= $interest) {
            
            $rate = $interest;
        } else {
            
            $rate = $gross_rtrn;
        }
        
        return $rate;
        
    }
    function calc_interest_rate_override($gross_rtrn = NULL, $net_rtrn = NULL, $user_intrst = NULL, $prjt_id = NULL, $uid = NULL,$override_date_status=NULL){
        $whr          = array('user_id' => $uid);
        $user_details = $this->get_row('funds_users', 'user_id,parent_user,user_interest_rate,user_floor_rate,', $whr);   
        
        if($user_details['user_floor_rate']!="" && $user_details['user_floor_rate']!=0 && $override_date_status=='Y'){
            $user_intrst  = $user_details['user_floor_rate'];
        }
        if($user_intrst == 0 || $user_intrst == '') {
            $interest = $net_rtrn;
        }else{
            $interest = $user_intrst; 
        }
        
        if ($gross_rtrn >= $interest) {
            $rate = $interest;
        } else {
            $rate = $gross_rtrn;
        }
        return $rate;
    }
    function compare_interest_rate_override($prjt_id = NULL, $uid = NULL, $current_feetotal = NULL,$share_holder_id=NULL)
    {
        
        $user_details    = $this->common->get_row('funds_users', 'user_id,parent_user,user_interest_rate,gross_interest_rate,user_servicefee_override,user_floor_rate,override_effective_date,user_base_rate,sharestate_base_rate,base_rate_updated_date,override_status', array(
            'user_id' => $uid
        ));
        $project_details = $this->common->get_row('funds_projects', 'accrued_interest,fee_anual_return,fee_total,project_servicing_fee', array(
            'project_id' => $prjt_id
        ));
        $override_date      = "";
        if($user_details['override_effective_date']!="" && $user_details['override_effective_date']!="0000-00-00"){
           $override_date       = date('Y-m-d',strtotime($user_details['override_effective_date']));
           $override_date_str   = strtotime($override_date);
        }
        $fund_date ="";
        if($share_holder_id!=""){
            $share_holder_info = $this->common->get_row('funds_share_holders','payement_fund_clear_date',array('share_holder_id'=>$share_holder_id));
            $fc_date           = $share_holder_info['payement_fund_clear_date'];
            if($fc_date!="" && $fc_date!="0000-00-00"){
                $fund_date     = date('Y-m-d',strtotime($fc_date));
                $fund_date_str = strtotime($fund_date);
            }
        }
        #base rate date
        $baserate_date          = "";
        if($user_details['base_rate_updated_date']!="" && $user_details['base_rate_updated_date']!="0000-00-00"){
            $baserate_date      = date('Y-m-d',strtotime($user_details['base_rate_updated_date']));
            $baserate_date_str  = strtotime($baserate_date);
        }
        #
       
        $user_intrst     = $user_details['user_interest_rate'];
        $net_rtrn        = $project_details['fee_total'];
        $gross_rtrn      = $project_details['fee_anual_return'];
        $floor_rate      = $user_details['user_floor_rate']; 
        #
        $user_base_rate       = str_replace(array('%',',','$'), '',$user_details['user_base_rate']);
        $sharestate_base_rate = str_replace(array('%',',','$'), '',$user_details['sharestate_base_rate']);
        #
        if($floor_rate!="" && $floor_rate!=0){
           $user_intrst  = $floor_rate;
        }
        if($override_date_str<=$fund_date_str){
            $user_intrst  =$user_intrst;
            $override_date_status='Y';
        }else{
            $user_intrst  ="";
            $override_date_status='N';
        }
        if ($project_details['accrued_interest'] != 0 && $project_details['accrued_interest'] != 0.00) {
            $current_interest_rate = $this->investor_accured_interest_calc($project_details['fee_anual_return'], $net_rtrn, $project_details['accrued_interest']);
            $gross_rtrn            = $gross_rtrn + $project_details['accrued_interest'];
        } else {
            $current_interest_rate = $this->calc_interest_rate_override($gross_rtrn, $net_rtrn, $user_intrst, $prjt_id, $uid,$override_date_status);
        }
        if ($current_feetotal != "") {
            $current_interest_rate = $current_feetotal;
        }

        #
        if($user_base_rate!="" && $user_base_rate>0 && $sharestate_base_rate!="" && $sharestate_base_rate > 0  && $net_rtrn>=$user_base_rate && ($baserate_date_str<=$fund_date_str)){
            
            $compare_rate   = $net_rtrn-$user_base_rate;
            $inv_plus_rate  = $compare_rate*(100-$sharestate_base_rate)/100;//$project_details['project_servicing_fee']*(100-$compare_rate)/100;
            $interest       = $user_base_rate+$inv_plus_rate;
        }elseif (($user_details['user_servicefee_override'] != "" && $user_details['user_servicefee_override'] != 0) && ($floor_rate =="" || $floor_rate==0) && ($override_date_str<=$fund_date_str) ) {
            $compare_rate = $project_details['project_servicing_fee'] * ($user_details['user_servicefee_override'] / 100);
            $interest     = $current_interest_rate + $compare_rate;
            
        } elseif (($user_details['gross_interest_rate'] != "" && $user_details['gross_interest_rate'] != 0) && ($floor_rate =="" || $floor_rate==0) && ($override_date_str<=$fund_date_str)) {
            $compare_rate   = $gross_rtrn * ($user_details['gross_interest_rate'] / 100);
            $share_interest = $compare_rate;
            $interest       = $gross_rtrn - $share_interest;
            if ($current_feetotal > $interest) {
                $interest = $current_feetotal;
            }
        } else {
            $interest = $current_interest_rate;
            if ($current_feetotal != "") {
                $interest = $current_feetotal;
            }
        }

        //Service Fee Waiver (Property Type/Loan Purpose)
        $total_sfw = $this->service_fee_waiver($prjt_id,$uid,$user_details['override_status']);
        if($user_details['override_status']=="Add"){
            $interest = $interest+$total_sfw;
        }elseif($user_details['override_status']=="Over"){
            $interest = $total_sfw;
        }
        
        if ($gross_rtrn >= $interest) {
            
            $rate = $interest;
        } else {
            
            $rate = $gross_rtrn;
        }
        
        return $rate;
    }
    
    function get_data($table = NULL, $arr_where = NULL)
    {
        $this->db->where($arr_where);
        $result = $this->db->get($table);
        return $result->result_array();
    }
    
    /* interest rate calculation for investor's distribution */
    function investor_accured_interest_calc($current, $net_investor, $accured)
    {
        $net_investor       = str_replace('%', '', $net_investor);
        $gross_rate         = $current + $accured;
        $accured_percentage = ($current / $gross_rate) * 100;
        $invesor_rate       = $accured_percentage * ($net_investor / 100);
        $invesor_rate       = $invesor_rate . trim();
        if (fmod($invesor_rate, 1) !== 0.00) {
            return round(floor($invesor_rate * 100) / 100, 2);
        } else {
            return $invesor_rate;
        }
        
        //return round(floor($invesor_rate*100)/100,2);
    }
    /* interest rate calculation for investor's principal amount */
    function investor_accured_principal_calc($current, $net_investor, $accured)
    {
        $net_investor           = str_replace('%', '', $net_investor);
        $gross_rate             = $current + $accured;
        $gross_percentage       = ($accured / $gross_rate) * 100;
        $principal_invesor_rate = $gross_percentage * ($net_investor / 100);
        $principal_invesor_rate = $principal_invesor_rate . trim();
        if (fmod($principal_invesor_rate, 1) !== 0.00) {
            return round(floor($principal_invesor_rate * 100) / 100, 2);
        } else {
            return $invesor_rate;
        }
        //return round(floor($principal_invesor_rate*100)/100,2);;
        
    }
    function schedule_amount_project($project_id, $interest_rate)
    {
        $project_details = $this->get_row('funds_projects', 'project_id,project_developer_payment_frequency,project_goal', array(
            'project_id' => $project_id
        ));
        if ($project_details['project_developer_payment_frequency'] == 'Monthly') {
            $schedule_amount = ($project_details['project_goal'] * $interest_rate / 100) / 12;
        } else if ($project_details['project_developer_payment_frequency'] == 'Half Yearly') {
            $schedule_amount = ($project_details['project_goal'] * $interest_rate / 100) / 2;
        } else if ($project_details['project_developer_payment_frequency'] == 'Quarterly') {
            
            $schedule_amount = ($project_details['project_goal'] * $interest_rate / 100) / 4;
        } else if ($project_details['project_developer_payment_frequency'] == 'End of Term') {
            
            $schedule_amount = ($project_details['project_goal'] * $interest_rate / 100);
        }
        return round($schedule_amount, 2, PHP_ROUND_HALF_UP);
    }
    
    #----------------------------------------------------------------------------------------
    public function get_ach_reject_data($reject_code)
    {
        $rejection = array(
            '6001' => 'Receiving DFI ID not found',
            '6002' => 'Addenda record indicator is non-numeric',
            '6003' => 'Addenda record indicator not 1 or 0 on a received file',
            '6004' => 'Addenda record indicator is 1, but addenda record does not follow',
            '6005' => 'Transaction code is invalid - changed to a demand credit (22), same as previous detail record',
            '6006' => 'Transaction code is invalid - changed to a demand debit (27), same as previous detail record',
            '6007' => 'Amount is not zero for a prenote',
            '6008' => 'Amount is zero for a non-prenote',
            '6009' => 'Amount field is non-numeric',
            '6010' => 'Invalid characters found in account number field',
            '6011' => 'CCD - transaction code is a return type',
            '6012' => 'Individual ID number is spaces or zeroes',
            '6014' => 'CTX - number of special addenda not equal to accumulated addenda records',
            '6015' => 'MTE - addenda record indicator is not 1',
            '6016' => 'MTE - individual name is spaces',
            '6017' => 'MTE - individual ID number is spaces or zeroes',
            '6018' => 'MTE - record after 6 record is not a 7 record',
            '6019' => 'Item rejected - card type transaction code is zeroes for POS class',
            '6020' => 'Item rejected - card type transaction code was not alphameric for POS class',
            '6021' => 'POS - record after 6 record is not a 7 record',
            '6022' => 'SHR - item rejected, card type transaction code was not numeric',
            '6023' => 'SHR - record after 6 record is not a 7 record',
            '6024' => 'PPD - transaction code cannot be a return',
            '6025' => 'COR - transaction code not a return',
            '6026' => 'COR - dollar amount is not numeric',
            '6027' => 'COR - dollar amount is greater than zero',
            '6029' => 'MICR item amount is not greater than zero',
            '6030' => 'Receiving DFI ID not within range',
            '6031' => 'Invalid transaction code - changed to a savings credit (32), same as previous detail record',
            '6032' => 'Invalid transaction code - changed to a savings debit (37), same as previous detail record',
            '6033' => 'Invalid transaction code - forced to (27) because transaction code for previous record not known',
            '6034' => 'Individual ID number cannot be spaces or zeros for CIE',
            '6035' => 'Invalid character(s) found in individual ID field',
            '6036' => 'Invalid character(s) found in individual name field',
            '6037' => ' Invalid characters found in discretionary data field (CCD, PPD, CIE, MTE)',
            '6038' => 'Invalid discretionary data value',
            '6039' => 'Invalid characters found in individual name',
            '6040' => 'Invalid characters found in sending company audit field (CTX)',
            '6041' => 'Invalid characters found in receiving company name/ID (CTX)',
            '6042' => 'Invalid characters found in discretionary data field (CTX)',
            '6043' => 'Invalid characters found in card expiration date',
            '6044' => 'Invalid characters found in document reference number',
            '6045' => 'SHR - card type transaction code was not numeric',
            '6046' => 'Original trace sequence number is not numeric or is zero',
            '6047' => 'Original trace sequence number not in ascending order',
            '6050' => 'Created prenote was rejected because related item reject',
            '6051' => 'DNE transaction is not in prenote format',
            '6052' => 'DNE item does not contain an addenda',
            '6053' => 'DNE items can have only one addenda',
            '6054' => 'Receiving DFI not found',
            '6055' => 'Invalid character in receiving DFI',
            '6056' => 'Transaction code not numeric',
            '6057' => 'Transaction code not valid',
            '6058' => 'GL/Recon Plus transaction code not valid',
            '6059' => 'Remittance transaction contains non-zero dollar amount',
            '6060' => 'Remittance transaction cannot be used with current class code',
            '6061' => 'Transaction code must be credit remittance transaction',
            '6062' => 'Transaction requires an addenda',
            '6063' => ' Transaction requires “REVERSAL” in the entry description on the 5 record',
            '6064' => 'G/L transaction account missing source code preceded by an asterisk (*)',
            '6065' => 'G/L transactions require at least 9 digits prior to the asterisk (*) and source',
            '6066' => 'G/L transaction was classified as MICR; cannot process G/L transaction',
            '6070' => 'CBR/PBR - record after 6 record is not a 7 record',
            '6071' => 'CBR/PBR - transaction code cannot be a return',
            '6072' => 'Serial number must be supplied',
            '6073' => 'Credit rejected - batch 5 record has invalid data in international data fields',
            '6080' => 'POP - transaction code cannot be a return transaction code',
            '6081' => 'POP - invalid serial number/city/state',
            '6090' => 'Transaction code cannot be a return transaction code',
            '6091' => 'Invalid or blank entry description',
            '6092' => 'RCK - transaction exceeds maximum dollar amount',
            '6093' => 'WEB/TEL - transaction code cannot be a return',
            '6094' => 'WEB/TEL - invalid credit transaction',
            '6100' => 'Check conversion not allowed for this routing/transit number',
            '6101' => 'Check conversion - account number exceeds allowed length for this routing/transit number',
            '6102' => 'Check conversion - check serial number field exceeds maximum of five digits',
            '6103' => 'ARC/BOC/POP transactions over $25,000',
            '6104' => 'IAT - invalid or missing number of addenda records',
            '6105' => 'IAT - missing all mandatory addenda records for origination',
            '6106' => 'IAT - missing all mandatory addenda records for a return',
            '6107' => 'IAT - invalid account number',
            '6108' => 'IAT - missing required remittance (717) addenda on ARC, BOC, RCK or POP',
            '6109' => 'IAT - RTN must be 391001268 for international transactions',
            '6110' => 'IAT - number of addenda records field is non-numeric',
            '6111' => 'IAT - number of addenda records field does not match number of addenda records with item',
            '6112' => 'IAT - transaction contains no addenda records',
            '6113' => 'IAT - transaction contains more than two 717 type addenda records',
            '6114' => 'IAT - transaction contains more than a total of five 717 and 718 addenda',
            '6501' => 'Addenda indicator not 1 or 0',
            '6502' => 'Addenda indicator not 1 - overridden on originated file',
            '6503' => 'Trace number not numeric - override with bank control routing/transit number for origination file',
            '6504' => 'Trace number does not equal routing/transit number on 5 record',
            '6505' => 'Check digit is not numeric on originated file',
            '6506' => 'Check digit invalid on originated file',
            '6507' => 'File level item limit exceeded',
            '6508' => 'Company level item limit exceeded',
            '6509' => 'Transaction code is invalid for service class code of 200',
            '6510' => 'Transaction code is invalid for service class code of 225',
            '6511' => 'Receiving company name/ID number is not left-justified',
            '6512' => 'CTX - receiving company name/ID number is not left-justified',
            '6513' => 'POS - addenda record indicator not 1',
            '6514' => 'SHR - addenda record indicator not 1',
            '6515' => 'Addenda indicator not 0 - overridden on originated file',
            '6516' => 'Addenda record indicator must be 1 for MTE class code',
            '6517' => 'Invalid account number - contains only spaces, slashes, zeros, or dashes',
            '6518' => 'Account number is not left-justified',
            '6520' => 'Transaction doesn’t qualify as zero dollar transaction - prenote forced',
            '6530' => 'Account number on both AA addenda and detail record',
            '6531' => 'Detail account number existed and AA addenda existed without account number',
            '6532' => 'Discretionary data of 01 and AA addenda existed but no account number found',
            '6533' => 'Discretionary data of 01, account number missing from detail; no AA addenda',
            '6534' => 'Discretionary data of 01, account number missing from detail; no addenda record ',
            '6535' => 'Discretionary data 01 forced because of AA addenda',
            '6536' => 'Discretionary data 01 forced because of 02 addenda',
            '6537' => 'WEB - Position 77 must be R or S',
            '6538' => 'Found R or S in position 78, moved to position 77',
            '6551' => 'IAT - invalid OFAC screening indicator',
            '6552' => 'IAT - invalid secondary OFAC screening indicator',
            '6553' => 'IAT - entry detail record - reserved area has data in position 17-29',
            'R01' => 'Insufficient Funds - Available balance is not sufficient to cover the dollar value of the debit entry.',
            'R02' => 'Account Closed - Previously active account has been closed by customer or RDFI.',
            'R03' => 'No Account/Unable to Locate Account - Account number structure is valid and passes editing process, but does not correspond to individual or is not an open account.',
            'R04' => ' Invalid Account Number - Account number structure not valid; entry may fail check digit validation or may contain an incorrect number of digits.',
            'R05' => 'Improper Debit to Consumer Account - A CCD, CTX, or CBR debit entry was transmitted to a Consumer Account of the Receiver and was not authorized by the Receiver.',
            'R06' => "Returned per ODFI's Request - ODFI has requested RDFI to return the ACH entry (optional to RDFI - ODFI indemnifies RDFI).",
            'R07' => 'Authorization Revoked by Customer - Consumer, who previously authorized ACH payment, has revoked authorization from Originator (must be returned no later than 60 days from settlement date and customer must sign affidavit).',
            'R08' => 'Payment Stopped - Receiver of a recurring debit transaction has stopped payment to a specific ACH debit. RDFI should verify the Receivers intent when a request for stop payment is made to insure this is not intended to be a revocation of authorization.',
            'R09' => 'Uncollected Funds - Sufficient book or ledger balance exists to satisfy dollar value of the transaction, but the dollar value of transaction is in process of collection (i.e., uncollected checks) or cash reserve balance below dollar value of the debit entry.',
            'R10' => 'Customer Advises Not Authorized - Consumer has advised RDFI that Originator of transaction is
        not authorized to debit account (must be returned no later than 60 days from settlement date of original entry and customer must sign affidavit).',
            'R11' => 'Check Truncation Entry Returned - used when returning a check safekeeping entry; RDFI should use appropriate field in addenda record to specify reason for return (i.e., "exceeds dollar limit," "stale date," etc.).',
            'R12' => 'Branch Sold to Another DFI - Financial institution receives entry destined for an account at a branch that has been sold to another financial institution.',
            'R13' => 'Invalid ACH routing number. Please enter a correct routing number.',
            'R14' => 'Account-holder Deceased [Representative Payee Deceased or Unable to Continue in that Capacity] - Account-holder is deceased (used in the event of death of a Representative Payee. guardian,or trustee).',
            'R15' => 'Beneficiary Deceased [Beneficiary or Account Holder (Other Than a Representative Payee) Deceased] - Beneficiary entitled to payments is deceased.',
            'R16' => 'Account Frozen - Funds unavailable due to specific action by the RDFI or by legal action.',
            'R17' => 'File Record Edit Criteria - Fields not edited by the ACH Operator are edited by the RDFI; field(s)
        causing processing error must be identified in the addenda record of return.',
            'R18' => 'Improper Effective Entry Date',
            'R19' => 'Amount Field Error',
            'R20' => 'Non Transaction Account - ACH entry is destined for a non-transaction account (i.e., an account
        against which transactions are prohibited or limited).',
            'R21' => 'Invalid Company Identification - number used in the Company ID field in error.',
            'R22' => 'Invalid Individual ID Number - in CIE entry the Individual ID Number is used by the Receiver to
        identify the account; Receiver has indicated to RDFI that number Originator identified is not correct.',
            'R23' => 'Credit Entry Refused by Receiver - Receiver refuses credit entry because of one of the following conditions: (1) minimum amount required by Receiver has not been remitted, (2) exact amount required has not been remitted, (3) account subject to litigation and Receiver will not accept transaction, (4) acceptance of transaction results in overpayment, (5) Originator is not known by Receiver, or (6) Receiver
        has not authorized the credit entry.',
            'R24' => 'Duplicate Entry - RDFI has received what appears to be a duplicate entry (i.e., trace number, date, dollar amount and/or other data matches another transaction).',
            'R25' => 'Addenda Error',
            'R26' => 'Mandatory Field Error',
            'R27' => 'Trace Number Error',
            'R28' => 'Routing Number Check Digit Error',
            'R29' => 'Corporate Customer Advises Not Authorized - RDFI has been notified by Receiver (non-consumer) that entry was not authorized.',
            'R30' => 'RDFI Not Participant in Check Truncation Program',
            'R31' => 'Permissible Return Entry (CCD and CTX only) - RDFI has been notified by ODFI that ODFI agrees
        to accept a return entry beyond normal return deadline.',
            'R32' => 'RDFI Non-Settlement',
            'R33' => 'Return of XCK Entry - RDFI, at its discretion, returns an XCK entry (code only used for XCK returns) XCK entries may be returned up to 60 days after settlement date.',
            'R34' => 'Limited Participation DFI',
            'R35' => 'Return of Improper Debit Entry',
            'R36' => 'Reserved',
            'R37' => 'Reserved - The source document to which an ACH entry relates has been presented for payment.',
            'R38' => 'STOP PAY (ARC)',
            'R39' => 'Reserved',
            'R40' => 'Non-Participant in ENR Program (ENR only) [Return of ENR Entry by Federal Government Agency(ENR only)]',
            'R41' => 'Invalid Transaction Code (ENR only)',
            'R42' => 'Routing Number/Check Digit Error (ENR only)',
            'R43' => 'Invalid DFI Account Number (ENR only)',
            'R44' => 'Invalid Individual ID Number (ENR only)[Invalid Individual ID Number/Identification Number (ENR only)]',
            'R45' => 'Invalid Individual Name (ENR only) [Invalid Individual Name/Company Name (ENR only)]',
            'R46' => 'Invalid Representative Payee Indicator (ENR only)',
            'R47' => 'Duplicate Enrollment (ENR only)',
            'R48' => 'Reserved',
            'R49' => 'Reserved',
            'R50' => "State Law Affecting RCK Acceptance - RDFI is in one of the states that have not accepted the Uniform Commercial Code and hasn't revised its consumer agreements to allow for electronic presentment, OR the RDFI is in a state that requires all canceled checks to be returned in the consumer statement.",
            'R51' => 'Item is Ineligible, Notice Not Provided, Signatures Not Genuine, Item Altered or Amount of RCK
        Entry not Accurately Obtained From the Item',
            'R52' => 'Stop Payment - RDFI determines that a stop payment has been placed on the item to which the RCK entry relates. RDFI has 60 days following settlement to return.',
            'R53' => 'Paper backup missing or not in agreement - In addition to an RCK entry, the item to which the RCK entry relates has also been presented for payment.',
            'R54' => 'Reserved',
            'R55' => 'Reserved',
            'R56' => 'Reserved',
            'R57' => 'Reserved',
            'R58' => 'Reserved',
            'R59' => 'Reserved Dishonored Return Codes for ODFIs',
            'R60' => 'Reserved',
            'R61' => 'Misrouted Return - RDFI of the original entry has placed the incorrect transit/routing number in the Receiving DFI Identification field.',
            'R62' => 'Incorrect Trace Number - Trace Number found in positions 07-21 in the addenda record of the Return is different from the trace number of the original entry.',
            'R63' => 'Incorrect Dollar Amount - Dollar amount in the Entry Detail Record of the Return is different from the dollar amount of the original entry.',
            'R64' => 'Incorrect Invidual Identification - Individual ID number reflected in the Entry Detail Record of the Return is different from the Individual ID number used in the original entry.',
            'R65' => 'Incorrect Transaction Code - Transaction Code in the Entry Detail Record of the Return is not the return equivalent of the Transaction Code in the original entry. (All entries must be returned as received:i.e., credit as credit, debit as debit, demand as demand, savings as savings.)',
            'R66' => 'Incorrect Company Identification - Company ID number used in the Company/Batch Header Record of the Return is different from the ID number used in the original entry.',
            'R67' => 'Duplicate Return - ODFI has received more than one return for the same entry.',
            'R68' => 'Untimely Return - Return was not sent within the time frame established by the rules.',
            'R69' => 'Multiple Errors - Two or more fields are incorrect (i.e. original entry trace number, amount,individual ID number, company ID and/or Transaction Code).',
            'R70' => 'Permissible Return Entry Not Accepted',
            'R71' => 'Misrouted Dishonored Return',
            'R72' => 'Untimely Dishonored Return',
            'R73' => 'Timely Original Return',
            'R74' => 'Corrected Return',
            'R80' => 'CROSS BORDER CODING ERROR',
            'R81' => 'NON-PARTICIPANT IN CROSS-BORDER PROGRAM',
            'R82' => 'INVALID FOREIGN RECEIVING DFI INDENTIFICATION',
            'R83' => 'FOREIGN RECEIVING DFI UNABLE TO SETTLE',
            'C01' => 'Incorrect DFI Account Number - Customers account number is Incorrect',
            'C02' => 'Incorrect Routing Number - Customers routing number is incorrect',
            'C03' => 'Incorrect Routing Number and DFI Account Number - Customers routing number and DFI account numbers are incorrect',
            'C04' => 'Incorrect Individual/Company Name - Customers name is incorrect',
            'C05' => 'Incorrect Transaction Code - Customers account type (Savings/Checking) is incorrect',
            'C06' => 'Incorrect Account Number and Transaction Code - Account number is incorrect and transaction is being routed to the wrong type of account'
        );
        //print_r($rejection);exit;
        return $rejection[$reject_code];
    }
    
    // public function get_ach_return_data($retrun_code){ 
    //    $retrun = array( 'R01' => 'Insufficient Funds','R02'=> 'Account Closed', 'R03' => 'No Account/Unable to Locate Account','R04'=> 'Invalid Account Number' );  
    //    return $retrun[$retrun_code];
    // }
    
    
    function month_feb($start)
    {
        $monthToAdd = 1;
        
        $d1 = DateTime::createFromFormat('Y-m-d', $start);
        
        $year  = $d1->format('Y');
        $month = $d1->format('n');
        $day   = $d1->format('d');
        
        $year += floor($monthToAdd / 12);
        $monthToAdd = $monthToAdd % 12;
        $month += $monthToAdd;
        if ($month > 12) {
            $year++;
            $month = $month % 12;
            if ($month === 0)
                $month = 12;
        }
        
        if (!checkdate($month, $day, $year)) {
            $d2 = DateTime::createFromFormat('Y-n-j', $year . '-' . $month . '-1');
            $d2->modify('last day of');
        } else {
            $d2 = DateTime::createFromFormat('Y-n-d', $year . '-' . $month . '-' . $day);
        }
        $d2->setTime($d1->format('H'), $d1->format('i'), $d1->format('s'));
        echo $d2->format('Y-m-d H:i:s');
    }
    
    
    function user_cashout_email($table = NULL, $arr_where = NULL)
    {
        $this->db->select('*');
        $this->db->from($table);
        $this->db->where($arr_where);
        $this->db->order_by('user_id');
        $this->db->order_by('project_id');
        
        //$this->db->group_by('project_id');
        
        $result = $this->db->get();
        return $result->result_array();
    }
    function get_details($table = NULL, $arr_where = NULL)
    {
        $this->db->where($arr_where);
        $result = $this->db->get($table);
        return $result->row_array();
    }
    function last_payoffloan_interest($schedule_date, $project_id)
    {
        // echo $schedule_date;exit;
        $this->db->select("SUM(funds_generate_distribution.final_distribution_amount-funds_generate_distribution.invest_amount) as sum_interest_payoff");
        $this->db->from('funds_generate_distribution');
        $this->db->where('funds_generate_distribution.project_id', $project_id);
        $this->db->where('funds_generate_distribution.generate_payoff_status', 'Y');
        $this->db->where('(MONTH(funds_generate_distribution.schedule_date)=MONTH("' . $schedule_date . '"))');
        
        $result = $this->db->get();
        // echo $this->db->last_query();exit;
        $res    = $result->row_array();
        return $res;
    }
    function isPaymentschedule($project_id)
    {
        $this->db->select('*');
        $this->db->from('funds_payment_schedule');
        $this->db->where('project_id', $project_id);
        $result = $this->db->get();
        return $result->result_array();
    }
    function isaddPaymentschedule($project_id)
    {
        $this->db->select('*');
        $this->db->from('funds_payment_schedule');
        $this->db->where('project_id', $project_id);
        $this->db->where('schedule_status', 'A');
        $result = $this->db->get();
        return $result->result_array();
    }
    
    function isPayoff($project_id)
    {
        $this->db->select("*");
        $this->db->from('funds_generate_distribution');
        $this->db->where('funds_generate_distribution.project_id', $project_id);
        $this->db->where('funds_generate_distribution.generate_payoff_status', 'Y');
        $result = $this->db->get();
        // echo $this->db->last_query();exit;
        $res    = $result->result_array();
        return $res;
    }
    function investoremail_loanschedule_list($project_id)
    {
        $this->db->select('funds_payment_loan.* ');
        $this->db->from('funds_payment_loan');
        $this->db->where('funds_payment_loan.project_id', $project_id);
        $this->db->where('funds_payment_loan.schedule_date >= DATE(now())');
        $this->db->where('funds_payment_loan.schedule_status', 'C');
        $this->db->order_by('funds_payment_loan.schedule_date', 'ASC');
        $result = $this->db->get();
        //  echo $this->db->last_query();die();
        return $result->result_array();
    }
    
    function withdraw_funds_all()
    {
        $this->db->select('u.first_name, u.last_name, b.bank_name, b.bank_acc_no, b.bank_nickname, b.bank_routing_num, b.bank_acc_type, w.*');
        $this->db->from('funds_withdraw_funds w');
        $this->db->join('fund_bank b', 'b.bank_id = w.withdraw_bank ');
        $this->db->join('funds_users u', 'u.user_id = w.user_id');
        $this->db->where('w.withdraw_ach_status', '0');
        $result = $this->db->get();
        //echo $this->db->last_query();die();
        return $result->result_array();
    }
    function withdraw_funds_bulk()
    {
        $this->db->select('u.first_name, u.last_name, b.bank_name, b.bank_acc_no, b.bank_nickname, b.bank_routing_num, b.bank_acc_type, w.*');
        $this->db->from('funds_bulk_withdraw_funds w');
        $this->db->join('fund_bank b', 'b.bank_id = w.withdraw_bank ');
        $this->db->join('funds_users u', 'u.user_id = w.user_id');
        $this->db->where('w.withdraw_ach_status', '0');
        $result = $this->db->get();
        //echo $this->db->last_query();die();
        return $result->result_array();
    }
    function get_subtype_user($id = NULL)
    {
        $this->db->select('*');
        $this->db->from('funds_users');
        
        $this->db->where('funds_users.parent_user', $id);
        $result2     = $this->db->get(); //echo $this->db->last_query();
        $arr_result2 = $result2->result_array();
        $ar          = array();
        foreach ($arr_result2 as $re) {
            
            if ($re['sub_user_type'] == 'I') {
                $this->db->select('*');
                $this->db->from('funds_cashout_account');
                $this->db->where('funds_cashout_account.user_id', $id);
                $this->db->where('funds_cashout_account.account_type', 'IRA');
                $this->db->where('funds_cashout_account.bank_id !=', '');
                $result2     = $this->db->get(); //echo $this->db->last_query();
                $arr_result2 = $result2->result_array();
                if (!empty($arr_result2)) {
                    array_push($ar, 'IRA');
                }
            } elseif ($re['sub_user_type'] == 'T') {
                $this->db->select('*');
                $this->db->from('funds_cashout_account');
                $this->db->where('funds_cashout_account.user_id', $id);
                $this->db->where('funds_cashout_account.account_type', 'Trust');
                $this->db->where('funds_cashout_account.bank_id !=', '');
                $result2s     = $this->db->get(); //echo $this->db->last_query();
                $arr_result2s = $result2s->result_array();
                if (!empty($arr_result2s)) {
                    array_push($ar, 'Trust');
                }
            } elseif ($re['sub_user_type'] == 'E') {
                $this->db->select('*');
                $this->db->from('funds_cashout_account');
                $this->db->where('funds_cashout_account.user_id', $id);
                $this->db->where('funds_cashout_account.account_type', 'Entity');
                $this->db->where('funds_cashout_account.bank_id !=', '');
                $result2     = $this->db->get(); //echo $this->db->last_query();
                $arr_result2 = $result2->result_array();
                if (!empty($arr_result2)) {
                    array_push($ar, 'Entity');
                }
            } elseif ($re['sub_user_type'] == 'J') {
                $this->db->select('*');
                $this->db->from('funds_cashout_account');
                $this->db->where('funds_cashout_account.user_id', $id);
                $this->db->where('funds_cashout_account.account_type', 'Joint');
                $this->db->where('funds_cashout_account.bank_id !=', '');
                $result2     = $this->db->get(); //echo $this->db->last_query();
                $arr_result2 = $result2->result_array();
                if (!empty($arr_result2)) {
                    
                    array_push($ar, 'Joint');
                }
            }
            
            $this->db->select('*');
            $this->db->from('funds_cashout_account');
            $this->db->where('funds_cashout_account.user_id', $id);
            $this->db->where('funds_cashout_account.account_type', 'Personal');
            $this->db->where('funds_cashout_account.bank_id !=', '');
            $result_personal = $this->db->get(); //echo $this->db->last_query();
            $arr_personal    = $result_personal->result_array();
            if (!empty($arr_personal)) {
                array_push($ar, 'Personal');
            }
            
        }
        $b = array_unique($ar);
        return $b;
        
    }
    
    function get_subtype_user_funding($id = NULL)
    {
        $this->db->select('*');
        $this->db->from('funds_users');
        
        $this->db->where('funds_users.parent_user', $id);
        $result2     = $this->db->get(); //echo $this->db->last_query();
        $arr_result2 = $result2->result_array();
        $ar          = array();
        
        foreach ($arr_result2 as $re) {
            
            if ($re['sub_user_type'] == 'I') {
                array_push($ar, 'IRA');
            } elseif ($re['sub_user_type'] == 'T') {
                array_push($ar, 'Trust');
            } elseif ($re['sub_user_type'] == 'E') {
                array_push($ar, 'Entity');
            } elseif ($re['sub_user_type'] == 'J') {
                array_push($ar, 'Joint');
            }
            array_push($ar, 'Personal');
            
        }
        
        $b = array_unique($ar);
        return $b;
        
    }
    
    function get_all_investors()
    {
        $this->db->select('*');
        $this->db->from('funds_share_holders');
        $this->db->join('funds_users', 'funds_users.user_id = funds_share_holders.user_id');
        $this->db->join('funds_payments', 'funds_payments.share_holder_id = funds_share_holders.share_holder_id');
        $this->db->where('funds_payments.payment_date >= "2015-01-01" and  funds_payments.payment_date <= "2015-12-31" ');
        $this->db->where('funds_share_holders.IsDeleted','N');
        $this->db->where('funds_payments.IsDeleted','N');
        $this->db->group_by('funds_share_holders.user_id');
        $result     = $this->db->get();
        // echo $this->db->last_query();
        $arr_result = $result->result_array();
        return $arr_result;
    }
    
    function get_all_investor_users($arr_where)
    {
        $this->db->select('*');
        $this->db->from('funds_share_holders');
        $this->db->join('funds_users', 'funds_users.user_id = funds_share_holders.user_id');
        $this->db->join('funds_payments', 'funds_payments.share_holder_id = funds_share_holders.share_holder_id');
        $this->db->where($arr_where);
        $this->db->where('funds_share_holders.IsDeleted', 'N');
        $this->db->where('funds_payments.IsDeleted','N');
        //$this->db->where('(funds_users.sub_user_type = "E" OR  funds_users.parent_user IN ("select user_id from funds_users"))  ');
        //$this->db->where('funds_payments.payment_date >= "2015-01-01" and  funds_payments.payment_date <= "2015-12-31" ');
        $this->db->group_by('funds_share_holders.user_id');
        $result     = $this->db->get();
        //echo $this->db->last_query();exit;
        $arr_result = $result->result_array();
        return $arr_result;
    }
    
    function get_all_investor_users_ind($arr_where)
    {
        $this->db->select('*');
        $this->db->from('funds_users');
        $this->db->where($arr_where);
        //$this->db->where('(funds_users.sub_user_type = "E" OR  funds_users.parent_user IN ("select user_id from funds_users"))  ');
        //$this->db->where('funds_payments.payment_date >= "2015-01-01" and  funds_payments.payment_date <= "2015-12-31" ');
        $this->db->group_by('funds_users.user_id');
        $result     = $this->db->get();
        //echo $this->db->last_query();exit;
        $arr_result = $result->result_array();
        return $arr_result;
    }
    
    function get_all_developers()
    {
        $this->db->select('*');
        $this->db->from('funds_developers');
        $this->db->join('funds_projects', 'funds_projects.developer_id = funds_developers.developer_id');
        $result     = $this->db->get(); //echo $this->db->last_query();
        $arr_result = $result->result_array();
        return $arr_result;
    }
    
    function get_all_sub_users($id = NULL)
    {
        
       $res    = $this->db->query("SELECT * FROM (`funds_users`)  WHERE  ((`funds_users`.`user_id` = '" . $id . "' OR `funds_users`.`parent_user` = '" . $id . "')AND (user_status='A' AND ((sub_user_type = 'I' AND ira_status = 'Y' ) OR (sub_user_type <> 'I')))) order by `user_id`");
        $result = $res->result_array();
        return $result;
    }

     function get_all_sub_accounts($id = NULL){

        $res    = $this->db->query("SELECT * FROM (`funds_users`)  WHERE  (`funds_users`.`user_id` = '" . $id . "' OR `funds_users`.`parent_user` = '" . $id . "')");
        $result = $res->result_array();
        return $result;
    }
    
    
    
    
    function get_row_roject_auto($id = NULL, $p_id = NULL)
    {
        $res    = $this->db->query("SELECT * FROM (`funds_users`) RIGHT JOIN `funds_project_autopay` ON `funds_project_autopay`.`user_id`=`funds_users`.`user_id` WHERE `funds_project_autopay`.`project_id` = '" . $p_id . "' AND  (`funds_users`.`user_id` = '" . $id . "' OR `funds_users`.`parent_user` = '" . $id . "') AND  `funds_project_autopay`.`bank_id` !='0'");
        $result = $res->result_array();
        return $result;
    }
    
    
    
    
    
    
    function calculate_project_term($project_payment_frequency)
    {
        if ($project_payment_frequency == "Monthly") {
            $term = 12;
        } else if ($project_payment_frequency == "Half Yearly") {
            $term = 2;
        } else if ($project_payment_frequency == "Quarterly") {
            $term = 3;
        } else {
            $term = 1;
        }
        return $term;
    }
    function find_date_difference($startdate, $enddate, $close, $loan_sales_date, $payoff_date, $loan_sales_status)
    {
        //echo $close;
        //$startdate='2016-02-09';
        //$enddate = '2016-04-01';
        $closedate     = date('Y-m-d', strtotime($close));
        $close_month   = date('m', strtotime($closedate));
        $close_year    = date('Y', strtotime($closedate));
        $close_day     = date('d', strtotime($closedate));
        $start         = date('Y-m-d', strtotime($startdate));
        $end           = date('Y-m-d', strtotime($enddate));
        $current_month = date('m', strtotime($end));
        $current_year  = date('Y', strtotime($end));
        $current_day   = date('d', strtotime($end));
        
        /* payoff date */
        $payoffdate   = date('Y-m-d', strtotime($payoff_date));
        $payoff_month = date('m', strtotime($payoffdate));
        $payoff_year  = date('Y', strtotime($payoffdate));
        $payoff_day   = date('d', strtotime($payoffdate));
        /* loansales date */
        $salesdate    = date('Y-m-d', strtotime($loan_sales_date));
        $sales_month  = date('m', strtotime($salesdate));
        $sales_year   = date('Y', strtotime($salesdate));
        $sales_day    = date('d', strtotime($salesdate));
        
        $sdate     = strtotime($start);
        $stop_date = $start;
        $edate     = strtotime($end);
        $rem_days  = ($edate - $sdate);
        $datediff  = (floor($rem_days / (60 * 60 * 24))) + 1;
        $k         = 0;
        //$perdiem=0;
        if ($sdate < $edate) {
            
            for ($i = strtotime(($stop_date), strtotime($end)); $i < $edate; $i = strtotime('+1 month', $i)) {
                
                $sdate      = strtotime($i);
                $stop_date  = date('Y-m-d', $i);
                $stop_month = date('m', strtotime($stop_date));
                $stop_year  = date('Y', strtotime($stop_date));
                $stop_day   = date('d', strtotime($stop_date));
                if (($close != "" && $close != "0000-00-00") && ($stop_year == $close_year && $stop_month == $close_month)) {
                    //echo "1";
                    $no_daysin_closemonth = cal_days_in_month(CAL_GREGORIAN, $close_month, $close_year);
                    //echo $no_daysin_closemonth;exit();
                    if ($no_daysin_closemonth == 31) {
                        $closetotalday = 30;
                    } else {
                        $closetotalday = $no_daysin_closemonth;
                    }
                    if ($stop_year == $current_year && $stop_month == $current_month) {
                        $perdiem = ($closetotalday - $current_day);
                    } else {
                        $perdiem = ($closetotalday - $close_day) + 1;
                        //echo $close_day."w";
                    }
                    
                } elseif (($payoff_date != "" && $payoff_date != "0000-00-00") && ($stop_year == $payoff_year && $stop_month == $payoff_month)) {
                    //echo "2";
                    if ($payoff_day == 31) {
                        $perdiem = 30;
                    } else {
                        $perdiem = $payoff_day;
                    }
                } elseif (($loan_sales_date != "" && $loan_sales_date != "0000-00-00" && $loan_sales_status == 'Y') && ($stop_year == $sales_year && $stop_month == $sales_month)) {
                    // echo "3";
                    if ($sales_day == 31) {
                        $perdiem = 30;
                    } else {
                        $perdiem = $sales_day;
                    }
                } else {
                    //echo "4";
                    $no_daysin_month = cal_days_in_month(CAL_GREGORIAN, $stop_month, $stop_year);
                    if ($no_daysin_month == 31) {
                        $totalda = 30;
                        
                    } else {
                        $totalda = $no_daysin_month;
                    }
                    //echo  $stop_year."==".$current_year."&&".$stop_month."==".$current_month;
                    if ($stop_year == $current_year && $stop_month == $current_month) {
                        //echo $stop_month;
                        //$perdiem= ($totalda-$current_day)+1;
                        $perdiem = $current_day;
                        //echo $perdiem." dfg1";
                        //echo $perdiem;
                    } else {
                        $perdiem = $totalda;
                        //echo $perdiem." dfg2";
                    }
                    //  echo $perdiem."w";
                    
                }
                
                if (($perdiem == '29' && $stop_month == '2') || $perdiem == '31') {
                    $perdiem = 30;
                }
                
                $sum = $sum + $perdiem;
                //echo $sum." dfg";
            }
            
            $datdif = $sum;
            //exit();
        } else {
            $datdif = $perdiem;
        }
        // echo $datdif." dfg";
        return $datdif;
        
    }
    /*New date difference*/
    function find_date_difference_new($startdate,$enddate,$close,$loan_sales_date,$payoff_date,$loan_sales_status,$sale_status){
        $closedate       = date('Y-m-d',strtotime($close));
        $close_month     = date('m',strtotime($closedate));
        $close_year      = date('Y',strtotime($closedate));
        $close_day       = date('d',strtotime($closedate));
        $start           = date('Y-m-d',strtotime($startdate));
        $end             = date('Y-m-d',strtotime($enddate));
        $current_month   = date('m',strtotime($end));
        $current_year    = date('Y',strtotime($end));
        $current_day     = date('d',strtotime($end));
        
        /* payoff date */
        $payoffdate       = date('Y-m-d',strtotime($payoff_date));
        $payoff_month     = date('m',strtotime($payoffdate));
        $payoff_year      = date('Y',strtotime($payoffdate));
        $payoff_day       = date('d',strtotime($payoffdate));
        /* loansales date */
        $salesdate        = date('Y-m-d',strtotime($loan_sales_date));
        $sales_month      = date('m',strtotime($salesdate));
        $sales_year       = date('Y',strtotime($salesdate));
        $sales_day        = date('d',strtotime($salesdate));

        if(($payoff_date!="" && $payoff_date!="0000-00-00") && $end>=$payoffdate){
            $end    = $payoffdate;
        }
        
        if($loan_sales_date!="" && $loan_sales_date!="0000-00-00" && $loan_sales_status=='Y' && $sale_status=='I'){
            $end    = $salesdate;
        }
        $sdate      = strtotime($start);
        $stop_date  = $start;
        $edate      = strtotime($end);
        $rem_days   = ($edate - $sdate);
        $datediff   = (floor($rem_days/(60*60*24)))+1;
        
        if($sdate <= $edate){
             $sum = 0;
            for($i = strtotime(($stop_date), strtotime($end)); $i < $edate; $i = strtotime('+1 day', $i)){
               $stop_day=date('d',$i);
               if($stop_day=='31'){
                continue;
               }
                $sum=$sum+1;
            }
            return $sum+1;
        }
    }
    
    function find_date_difference_new1111111($startdate, $enddate, $close, $loan_sales_date, $payoff_date, $loan_sales_status)
    {
        //echo $close;
        //$startdate='2016-02-09';
        $closedate     = date('Y-m-d', strtotime($close));
        $close_month   = date('m', strtotime($closedate));
        $close_year    = date('Y', strtotime($closedate));
        $close_day     = date('d', strtotime($closedate));
        $start         = date('Y-m-d', strtotime($startdate));
        $end           = date('Y-m-d', strtotime($enddate));
        $current_month = date('m', strtotime($end));
        $current_year  = date('Y', strtotime($end));
        $current_day   = date('d', strtotime($end));
        
        /* payoff date */
        $payoffdate   = date('Y-m-d', strtotime($payoff_date));
        $payoff_month = date('m', strtotime($payoffdate));
        $payoff_year  = date('Y', strtotime($payoffdate));
        $payoff_day   = date('d', strtotime($payoffdate));
        /* loansales date */
        $salesdate    = date('Y-m-d', strtotime($loan_sales_date));
        $sales_month  = date('m', strtotime($salesdate));
        $sales_year   = date('Y', strtotime($salesdate));
        $sales_day    = date('d', strtotime($salesdate));
        
        $sdate     = strtotime($start);
        $stop_date = $start;
        $edate     = strtotime($end);
        $rem_days  = ($edate - $sdate);
        $datediff  = (floor($rem_days / (60 * 60 * 24))) + 1;
        $k         = 0;
        //$perdiem=0;
        if ($sdate < $edate) {
            
            for ($i = strtotime(($stop_date), strtotime($end)); $i < $edate; $i = strtotime('+1 month', $i)) {
                
                $sdate     = strtotime($i);
                $stop_date = date('Y-m-d', $i);
                
                
                $stop_month = date('m', strtotime($stop_date));
                $stop_year  = date('Y', strtotime($stop_date));
                $stop_day   = date('d', strtotime($stop_date));
                
                $startYear  = date('Y', strtotime($start));
                $startmonth = date('m', strtotime($start));
                $startday   = date('d', strtotime($start));
                
                if (($startdate != "" && $startdate != "0000-00-00") && ($stop_year == $close_year && $startmonth == $stop_month)) {
                    //echo "1".$close_month;
                    //echo $stop_month;
                    $no_daysin_closemonth = cal_days_in_month(CAL_GREGORIAN, $startmonth, $startYear);
                    //exit();
                    if ($no_daysin_closemonth == 31) {
                        $closetotalday = 30;
                    } else {
                        $closetotalday = $no_daysin_closemonth;
                    }
                    if ($current_day == 31) {
                        $current_day = 30;
                    } else {
                        $current_day = $current_day;
                    }
                    
                    
                    //echo $no_daysin_closemonth;
                    if ($stop_year == $current_year && $startmonth == $stop_month) {
                        //echo "r";
                        $perdiem = ($closetotalday - $startday);
                        
                    } else { //echo "t";
                        $perdiem = ($closetotalday - $startday) + 1;
                        //echo $close_day."w";
                    }
                    //echo "b".$startday.'<br>';
                    
                } elseif (($payoff_date != "" && $payoff_date != "0000-00-00") && ($stop_year == $payoff_year && $stop_month == $payoff_month)) {
                    //echo "2".'<br>';
                    if ($payoff_day == 31) {
                        $perdiem = 30;
                    } else {
                        $perdiem = $payoff_day;
                    }
                } elseif (($loan_sales_date != "" && $loan_sales_date != "0000-00-00" && $loan_sales_status == 'Y') && ($stop_year == $sales_year && $stop_month == $sales_month)) {
                    // echo "3".'<br>';
                    if ($sales_day == 31) {
                        $perdiem = 30;
                    } else {
                        $perdiem = $sales_day;
                    }
                } else {
                    //echo "4".'<br>';
                    $no_daysin_month = cal_days_in_month(CAL_GREGORIAN, $stop_month, $stop_year);
                    if ($no_daysin_month == 31) {
                        $totalda = 30;
                        
                    } else {
                        $totalda = $no_daysin_month;
                    }
                    //echo  $stop_year."==".$current_year."&&".$stop_month."==".$current_month;
                    if ($stop_year == $current_year && $stop_month == $current_month) {
                        //echo $stop_month;
                        //$perdiem= ($totalda-$current_day)+1;
                        $perdiem = $current_day;
                        //echo $perdiem." dfg1";
                        //echo $perdiem;
                    } else {
                        $perdiem = $totalda;
                        //echo $perdiem." dfg2";
                    }
                    //  echo $perdiem."w";
                    
                }
                
                $sum = $sum + $perdiem;
                //echo $sum." dfg";
            }
            
            $datdif = $sum;
            //exit();
        } else {
            $datdif = $perdiem;
        }
        //echo $datdif.'<br>';
        return $datdif;
    }
    function update_account($tbl, $user_id, $data)
    {
        $this->db->where('user_id', $user_id);
        $this->db->update($tbl, $data);
    }
    function calculate_perdiem($fundclear, $close)
    {
        $fundcleardate   = date('Y-m-d', strtotime($fundclear));
        $fundclear_month = date('m', strtotime($fundclear));
        $fundclear_year  = date('Y', strtotime($fundclear));
        $closedate       = date('Y-m-d', strtotime($close));
        $close_month     = date('m', strtotime($close));
        $close_year      = date('Y', strtotime($close));
        $close_day       = date('d', strtotime($close));
        if ($fundclear_year == $close_year && $fundclear_month == $close_month) {
            $no_daysin_sale_month = cal_days_in_month(CAL_GREGORIAN, $close_month, $close_year);
            if ($no_daysin_sale_month == 31) {
                $totaldays = 30;
            } else {
                
            }
            
        }
        
    }
    #-----------------------------------------------------------------------------
    function update_auto_account($tbl, $account_id, $data)
    {
        $this->db->where('account_id', $account_id);
        // $this->db->where('account_type',$account_type);
        $this->db->update($tbl, $data);
    }
    #-----------------------------------------------------------------------------
    function update_auto_account_new($data = array(), $conditions = array())
    {
        
        if ($this->db->update('funds_cashout_account', $data, $conditions) == true) {
            return true;
        }
        
    }
    #-----------------------------------------------------------------------------
    function update_auto_withdraw_new($data = array(), $conditions = array())
    {
        // print_r($conditions);exit();
        if ($this->db->update('funds_bulk_cashout', $data, $conditions) == true) {
            
            return true;
        } else {
            return false;
        }
        
    }
    #-----------------------------------------------------------------------------
    function update_auto_account_project($data = array(), $conditions = array())
    {
        
        if ($this->db->update('funds_project_autopay', $data, $conditions) == true) {
            return true;
        }
        
    }
    function get_autopay_stat()
    {
        $this->db->select('user_id,autopay_status');
        $this->db->from('funds_project_autopay');
        $this->db->where('autopay_status', 'Y');
        $this->db->group_by('user_id');
        $result     = $this->db->get();
        $arr_result = $result->result_array();
        // echo $this->db->last_query();
        return $arr_result;
    }
    function set_cashouttype($data = array(), $conditions = array())
    {
        if ($this->db->update('funds_users', $data, $conditions) == true) {
            return true;
        }
    }
    
    /*function get_access_status($admin_id,$function_name,$label_name)
    {  
    $get_admin=$this->common->get_table('funds_admin_settings','admin_id',array('menu_id'=>1));
    $arr_data1 = array();
    foreach ($get_admin as $key => $value) {
    $arr_data1[] =       $value['admin_id'];            # code...
    }
    if($function_name=='')
    {
    $function_name='index';
    }
    $arr_result = $this->db  -> select('*,funds_admin_menu.menu_id as tets_menu ')
    -> join('funds_admin_menu','funds_admin_menu.menu_id = funds_admin_settings.menu_id')
    -> where('funds_admin_settings.admin_id', $admin_id)
    -> where('(funds_admin_menu.menu_function_name = "'.$function_name.'" or funds_admin_menu.menu_function_secound = "'.$function_name.'" )')
    //-> where('funds_admin_menu.menu_function_name',$function_name)
    //-> or_where('funds_admin_menu.menu_function_secound',$function_name)
    -> where('funds_admin_menu.menu_controller_name',$label_name)
    -> order_by('funds_admin_settings.menu_id', 'asc')
    -> get('funds_admin_settings')
    -> result_array();//echo $this->db->last_query();exit();
    //echo $arr_result[0]['settings_read_status']=='Y'
    if($arr_result[0]['settings_read_status']=='Y'|| in_array($admin_id,$arr_data1) || ($this->uri->segment(2)=='admin' &&  $this->uri->segment(3)=='')  || $admin_id==16 || $arr_result[0]['settings_write_status']=='Y' ||  $label_name=='reports' || $label_name=='bpdn' || $label_name=='request_draw' || $label_name=='generate_form'  ){
    return TRUE;
    }else {         
    return FALSE;
    }
    
    }*/
    
    function get_access_status($admin_id, $function_name, $label_name)
    {
        if ($function_name == '') {
            $function_name = 'index';
        }
        
        $get_admin = $this->common->get_table('funds_admin_settings', 'admin_id', array(
            'menu_id' => 1
        ));
        $get_class = $this->get_row('funds_admin_menu', '*', array(
            'menu_controller_name' => $label_name,
            'menu_function_name' => $function_name
        ));
        $arr_data1 = array();
        
        foreach ($get_admin as $key => $value) {
            $arr_data1[] = $value['admin_id']; # code...
        }
        
        $arr_result = $this->db->select('*,funds_admin_menu.menu_id as tets_menu ')->join('funds_admin_menu', 'funds_admin_menu.menu_id = funds_admin_settings.menu_id')->where('funds_admin_settings.admin_id', $admin_id)->where('(funds_admin_menu.menu_function_name = "' . $function_name . '" or funds_admin_menu.menu_function_secound = "' . $function_name . '" )')
        //-> where('funds_admin_menu.menu_function_name',$function_name)
            
        //-> or_where('funds_admin_menu.menu_function_secound',$function_name)
            ->where('funds_admin_menu.menu_controller_name', $label_name)->order_by('funds_admin_settings.menu_id', 'asc')->get('funds_admin_settings')->result_array(); //echo $this->db->last_query();exit();
        //echo $arr_result[0]['settings_read_status']=='Y'
        
        
        if ($arr_result[0]['settings_read_status'] == 'Y' || $this->session->userdata('SESS_ADMIN_TYPE') == 'S' || (in_array($admin_id, $arr_data1) && $label_name == 'admin') || ($this->uri->segment(2) == 'admin' && $this->uri->segment(3) == '') || $admin_id == 16 || $arr_result[0]['settings_write_status'] == 'Y' || $label_name == 'reports' || $label_name == 'bpdn' || $label_name == 'request_draw' || $label_name == 'generate_form' || (empty($get_class))) {
            return TRUE;
        } else {
            return FALSE;
        }
        
    }
    
    
    function get_all_users($project_id = NULL)
    {
        
        if ($project_id) {
            $this->db->where('funds_share_holders.project_id', $project_id);
        } else {
            $this->db->group_by('funds_projects.project_id');
        }
        $this->db->select("funds_share_holders.*,funds_payments.amount_per_share, funds_payments.number_shares,funds_users.sub_user_type, funds_users.first_name, funds_users.last_name,funds_users.sub_jacc_first_name, funds_users.sub_jacc_last_name, funds_projects.project_name,funds_projects.project_status");
        $this->db->from('funds_share_holders');
        $this->db->join("funds_users", "funds_share_holders.user_id = funds_users.user_id");
        $this->db->join("funds_payments", "funds_payments.share_holder_id = funds_share_holders.share_holder_id");
        $this->db->join("funds_projects", "funds_projects.project_id = funds_share_holders.project_id");
        $this->db->where('funds_share_holders.sale_status !=', 'I');
        $this->db->where('funds_share_holders.payement_fund_clear_date = "0000-00-00" ');
        $this->db->where('funds_projects.project_type != "PC" ');
        $this->db->where('funds_payments.IsDeleted',"N");
        $this->db->order_by("funds_projects.project_id", "ASC");
        $query  = $this->db->get();
        $result = $query->result_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
        
    }
    function get_missing_closingdate($project_id = NULL)
    {
        
        if ($project_id) {
            $this->db->where('funds_projects.project_id', $project_id);
        } else {
            $this->db->group_by('funds_projects.project_id');
        }
        $this->db->select("*");
        $this->db->from('funds_projects');
        $this->db->where('funds_projects.project_close_date = "0000-00-00" ');
        $this->db->where('funds_projects.project_status', 'A');
        $this->db->order_by("funds_projects.project_id", "ASC");
        $query  = $this->db->get();
        $result = $query->result_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
        
    }
    function get_shareholders_projects($uid, $pid)
    {
        
        
        $this->db->select('funds_share_holders.*,funds_users.*')->from('funds_share_holders')->join('funds_users', 'funds_users.user_id=funds_share_holders.user_id')->where('(funds_users.user_id = "' . $uid . '" or funds_users.parent_user = "' . $uid . '" )')->where('funds_users.user_status', 'A')->where('funds_share_holders.project_id', $pid) ->where('funds_share_holders.IsDeleted','N')->order_by('funds_users.first_name');
        
        $result = $this->db->get();
        // echo $this->db->last_query();exit();
        return $result->result_array();
        
    }
    function get_all_shareholderusers($project_id)
    {
        $this->db->select("*");
        $this->db->from('funds_share_holders');
        $this->db->join("funds_users", "funds_share_holders.user_id = funds_users.user_id", "both");
        $this->db->where('project_id', $project_id);
        $this->db->where('funds_share_holders.sale_status !=', 'I');
        $this->db->where('funds_share_holders.IsDeleted', 'N');
        $this->db->order_by("funds_users.first_name", "ASC");
        $query  = $this->db->get();
        $result = $query->result_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    
    function credit_amount_c($user_id, $type = NULL, $date = NULL){

        // $date = '2017-10-31';
        $this->db->select('sum(funds_credit_account.credit_amount) as amt');
        $this->db->from('funds_credit_account');
        $this->db->join('funds_users', 'funds_users.user_id = funds_credit_account.user_id');
        if ($type == 'I') {
            $this->db->where('(funds_users.user_id = ' . $user_id . ')');
        } else {
            $this->db->where('(funds_users.user_id = ' . $user_id . ' or funds_users.parent_user = ' . $user_id . ')');
        }
        if ($date != '') {
            $this->db->where('funds_credit_account.credit_date <= "' . $date . '"');
        }
        $this->db->where('funds_credit_account.credit_status', 'C');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    
    
    function credit_amount_d($user_id, $type = NULL, $date = NULL)
    {
        // $date = '2017-10-31';
        $this->db->select('sum(funds_credit_account.credit_amount) as amt');
        $this->db->from('funds_credit_account');
        $this->db->join('funds_users', 'funds_users.user_id = funds_credit_account.user_id');
        if ($type == 'I') {
            $this->db->where('(funds_users.user_id = ' . $user_id . ')');
        } else {
            $this->db->where('(funds_users.user_id = ' . $user_id . ' or funds_users.parent_user = ' . $user_id . ')');
        }
        if ($date != '') {
            $this->db->where('funds_credit_account.credit_date <= "' . $date . '"');
        }
        $this->db->where('funds_credit_account.credit_status', 'D');
        $query  = $this->db->get();
        $result = $query->result_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_account_credit_users($user_id, $type = NULL)
    {

        $credit_amount = $this->credit_amount_c($user_id, $type, '');
        $debit_amount  = $this->credit_amount_d($user_id, $type, '');
        if (!empty($credit_amount)) {
            // $c_amount = round(floor($credit_amount[0]['amt'] * 100) / 100, 2);
            $c_amount = $credit_amount[0]['amt'];
        } else {
            $c_amount = 0;
        }
        if (!empty($debit_amount)) {
            // $d_amount = round(floor($debit_amount[0]['amt'] * 100) / 100, 2);
            $d_amount = $debit_amount[0]['amt'];
        } else {
            $d_amount = 0;
        }
        $cr_amount = ($c_amount - $d_amount);
        return $cr_amount;
    }
    
    #--------------------------------------------------------------
    function get_accrued_principal($project_id)
    {
        
        $projects_details           = $this->db->select("project_id, project_developer_payment_start_date, accrued_interest, project_goal, project_developer_payment_frequency,project_construction_loan,project_extend_loan,project_dev_payment_charge_off,project_dev_payment_due")->from("funds_projects")->where("project_id", $project_id)->get()->row_array();
        $project_payemnt_start_date = $projects_details['project_developer_payment_start_date'];
        $accrued_interest           = $projects_details['accrued_interest'];
        $project_goal               = $projects_details['project_goal'];
        $estimated_type             = $projects_details['project_developer_payment_frequency'];
        $project_payment_end_date   = date("Y-m-d");
        $per_month_interset         = NULL;
        $total_interest             = NULL;
        //to find count of  payment schedule payed or not and find principal amount
        $this->db->select("schedule_id");
        $this->db->from("funds_payment_schedule");
        $this->db->where(array(
            "project_id" => $project_id,
            "DATE(schedule_date) <=" => $project_payment_end_date,
            'schedule_status' => "C"
        ));
        $paid_month = $this->db->get()->num_rows();
        
        $this->db->select("schedule_id");
        $this->db->from("funds_payment_schedule");
        $this->db->where(array(
            "project_id" => $project_id,
            'schedule_status' => "A"
        ));
        $not_paid    = $this->db->get()->num_rows();
        $total_month = $paid_month + $not_paid;
        
        //echo $this->db->last_query();
        
        // Extend loan schedule
        $loan_details       = $this->db->select('*')->from("funds_payment_loan")->where("project_id", $project_id)->get()->result_array();
        $developer_schedule = $this->db->select('*')->from("funds_developer_schedule")->where(array(
            "project_id" => $project_id,
            "schedule_status" => 'PR'
        ))->get()->result_array();
        
        $extend_fee_exist = $this->db->select('*')->from("funds_extension_payments")->where(array(
            "project_id" => $project_id
        ))->get()->row_array();
        if (!empty($loan_details) && $projects_details['project_extend_loan'] == 'Y' && ($projects_details['project_dev_payment_charge_off'] != "Y") && ($projects_details['project_dev_payment_due'] != "Y") && ($extend_fee_exist['payment_status'] == 'A')) {
            
            $this->db->select("loan_id");
            $this->db->from("funds_payment_loan");
            $this->db->where(array(
                "project_id" => $project_id,
                "DATE(schedule_date) <=" => $project_payment_end_date,
                'schedule_status' => "C"
            ));
            $paid_month_loan = $this->db->get()->num_rows();
            $paid_month      = $paid_month + $paid_month_loan;
            
            $this->db->select("loan_id");
            $this->db->from("funds_payment_loan");
            $this->db->where(array(
                "project_id" => $project_id,
                'schedule_status' => "A"
            ));
            $not_paid         = $this->db->get()->num_rows();
            $total_month_loan = $paid_month_loan + $not_paid;
            $total_month      = $total_month + $total_month_loan;
            
        }
        
        
        if (!empty($accrued_interest) && $accrued_interest > 0) {
            
            if ($estimated_type == 'Monthly') {
                $per_month_interset = ($project_goal * ($accrued_interest / 100) / 12);
                $total_interest     = $per_month_interset * $total_month;
                // echo $total_interest; 
                return round(($total_interest), 2, PHP_ROUND_HALF_UP);
            } else if ($estimated_type == 'Half Yearly') {
                
                $per_month_interset = ($project_goal * ($accrued_interest / 100) / 2);
                $total_interest     = $per_month_interset * $total_month;
                return round(($total_interest), 2, PHP_ROUND_HALF_UP);
            } else if ($estimated_type == 'Quarterly') {
                
                $per_month_interset = ($project_goal * ($accrued_interest / 100) / 4);
                $total_interest     = $per_month_interset * $total_month;
                return round(($total_interest), 2, PHP_ROUND_HALF_UP);
            } else if ($estimated_type == 'End of Term') {
                
                $per_month_interset = ($project_goal * ($accrued_interest / 100));
                $total_interest     = $per_month_interset * $total_month;
                return round(($total_interest), 2, PHP_ROUND_HALF_UP);
            }
            
        }
    }
    #--------------------------------------------------------------
    
    function get_service_fee($pid, $schedule_date)
    {
        $share_holders = $this->common->get_all_shareholderusers($pid);
        
        $project_details   = $this->common->get_row('funds_projects', 'project_id,project_goal,project_name,project_status,project_share,fee_anual_return,accrued_interest,fee_total', array(
            'project_id' => $pid
        ));
        $sum_invstr_amount = 0;
        
        
        foreach ($share_holders as $key => $shars) {
            $share_holders[$key]                              = $this->project->investor_details($shars['share_holder_id'], $schedule_date);
            $share_holders_new                                = $this->project->generate_distribution_details_new1($shars['share_holder_id'], $schedule_date);
            $share_holders[$key]['investor_amount']           = ($share_holders[$key]['amount_per_share']) * ($share_holders[$key]['pnumshare']);
            $share_holders[$key]['pnew_list']                 = $this->project->get_project_dist($share_holders[$key]['user_id'], $project_details['project_id']);
            $share_holders[$key]['investor_interest_rate']    = $this->ditribution_investor_interest_rate($share_holders_new, $share_holders[$key]['pnew_list']);
            $share_holders[$key]['investor_interest_peryear'] = ($share_holders[$key]['investor_amount'] * ($share_holders[$key]['investor_interest_rate']['fee_tot'] / 100));
            
            $sum_invstr_amount = $sum_invstr_amount + $share_holders[$key]['investor_interest_peryear'];
            /* if($project_details['project_id']==167){
            echo $key;
            echo '<pre>';
            echo '<pre>';print_r($share_holders_new);
            echo '<pre>';print_r($share_holders[$key]['investor_amount'] );
            echo '<pre>';print_r($share_holders[$key]['investor_interest_rate']);
            echo 'hr';
            }*/
            
            
        }
        
        $paymentinerest_peryear      = $project_details['project_goal'] * ($project_details['fee_anual_return'] / 100);
        $service_result              = (($paymentinerest_peryear - $sum_invstr_amount) / $project_details['project_goal']) / 12;
        $service_fee                 = $service_result * 100;
        $res['service_fee']          = $service_fee;
        $res['sfee_for_sharestates'] = $project_details['project_goal'] * ($service_fee / 100);
        return $res;
        
    }
    function default_interestrate_calc($pid, $sid)
    {
        $project_detailss    = $this->common->get_row('funds_projects', 'fee_anual_return,fee_total,accrued_interest', array(
            'project_id' => $pid
        ));
        $invs_interest_rate  = $this->common->get_row('funds_share_holders', '*', array(
            'share_holder_id' => $sid
        ));
        $user_intrst_details = $this->common->get_row('funds_users', 'user_id,user_interest_rate', array(
            'user_id' => $invs_interest_rate['user_id']
        ));
        $gros_rtrn           = $project_detailss['fee_anual_return'] + $project_detailss['accrued_interest'];
        $rateint             = $this->common->calc_interest_rate($gros_rtrn, $project_detailss['fee_total'], $user_intrst_details['user_interest_rate'], $project_detailss['project_id'], $user_intrst_details['user_id']);
        if ($invs_interest_rate['payement_investor_interest'] != 0 && $invs_interest_rate['payement_investor_interest'] != '') {
            $rate = $invs_interest_rate['payement_investor_interest'];
        } else {
            if ($project_detailss['accrued_interest'] != 0 && $project_detailss['accrued_interest'] != 0.00) {
                $rate = $this->common->investor_accured_interest_calc($project_detailss['fee_anual_return'], $rateint, $project_detailss['accrued_interest']);
            } else {
                $rate = $rateint;
            }
        }
        $rate = str_replace('%', '', $rate);
        return $rate;
    }
    function ditribution_investor_interest_rate($investor_details = NULL, $project_details = NULL)
    {
        
        
        $gros_rtrn      = $project_details[0]['fee_anual_return'] + $project_details[0]['accrued_interest'];
        $rateint        = $this->common->calc_interest_rate($gros_rtrn, $project_details[0]['fee_total'], $investor_details[0]['user_interest_rate'], $project_details[0]['project_id'], $investor_details[0]['user_id']);
        $dist_fee_total = $this->project->generate_distribution($investor_details[0]['user_id'], $project_details[0]['project_id']);
        if ($investor_details[0]['payement_investor_interest'] != 0 && $investor_details[0]['payement_investor_interest'] != '') {
            if ($project_details[0]['accrued_interest'] != 0 && $project_details[0]['accrued_interest'] != 0.00) {
                if ($this->session->userdata("payoff_month") == "payoff") {
                    $fee_total_update = $this->common->investor_accured_principal_calc($project_details[0]['fee_anual_return'], $rateint, $project_details[0]['accrued_interest']);
                    $fee_tot          = $fee_total_update;
                } else {
                    $fee_total_update = ($this->common->investor_accured_interest_calc($project_details[0]['fee_anual_return'], $rateint, $project_details[0]['accrued_interest']));
                    $fee_tot          = ($fee_total_update);
                }
            } else {
                $fee_tot          = $investor_details[0]['payement_investor_interest'];
                $fee_total_update = $investor_details[0]['payement_investor_interest'];
            }
        } else {
            if ($project_details[0]['accrued_interest'] != 0 && $project_details[0]['accrued_interest'] != 0.00) {
                if ($this->session->userdata("payoff_month") == "payoff") {
                    $fee_total_update = $this->common->investor_accured_principal_calc($project_details[0]['fee_anual_return'], $rateint, $project_details[0]['accrued_interest']);
                    $fee_tot          = $fee_total_update;
                } else {
                    $fee_total_update = $this->common->investor_accured_interest_calc($project_details[0]['fee_anual_return'], $rateint, $project_details[0]['accrued_interest']);
                    $fee_tot          = $fee_total_update;
                }
            } else {
                $fee_tot          = $rateint;
                $fee_total_update = $rateint;
            }
            
        }
        if ($project_details[0]['accrued_interest'] != 0 && $project_details[0]['accrued_interest'] != 0.00) {
            if ($this->session->userdata("payoff_month") == "payoff") {
                // $rateint = str_replace('%', '', $rateint);
                $fee_total_update = $this->common->investor_accured_principal_calc($project_details[0]['fee_anual_return'], $rateint, $project_details[0]['accrued_interest']);
                $fee_tot          = $fee_total_update;
            }
        }
        if ($investor_details[0]['generate_status'] == 'A') {
            $arr_result['fee_tot']          = $investor_details[0]['interest_rate'];
            $arr_result['fee_total_update'] = $fee_total_update;
        } else {
            $arr_result['fee_tot']          = $fee_tot;
            $arr_result['fee_total_update'] = $fee_total_update;
        }
        return $arr_result;
    }
    function get_late_waive($payoff_date, $pid)
    {
        
        $this->db->select("sum(funds_developer_schedule.dev_override_late_amount) as ov_late_amount,sum(funds_developer_schedule.dev_override_default_amount) as ov_def_amount");
        $this->db->from('funds_developer_schedule');
        $this->db->join('funds_payment_schedule', 'funds_payment_schedule.schedule_id=funds_developer_schedule.schedule_id');
        $this->db->where('funds_developer_schedule.project_id', $pid);
        $this->db->where('EXTRACT(YEAR_MONTH FROM funds_payment_schedule.schedule_date)<=', date('Ym', strtotime($payoff_date)));
        $query  = $this->db->get();
        $result = $query->row_array();
        // echo $this->db->last_query();die;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_late_waive_schedule($payoff_date, $pid)
    {
        
        $this->db->select("funds_payment_schedule.schedule_date");
        $this->db->from('funds_developer_schedule');
        $this->db->join('funds_payment_schedule', 'funds_payment_schedule.schedule_id=funds_developer_schedule.schedule_id');
        $this->db->where('funds_developer_schedule.project_id', $pid);
        $this->db->where('EXTRACT(YEAR_MONTH FROM funds_payment_schedule.schedule_date)<=', date('Ym', strtotime($payoff_date)));
        $this->db->where('dev_override_late_status <>', 'A');
        $this->db->where('dev_override_late_amount >', '0');
        $query  = $this->db->get();
        $result = $query->result_array();
        //  echo $this->db->last_query();die;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_late_waive_default_schedule($payoff_date, $pid)
    {
        
        $this->db->select("funds_payment_schedule.schedule_date");
        $this->db->from('funds_developer_schedule');
        $this->db->join('funds_payment_schedule', 'funds_payment_schedule.schedule_id=funds_developer_schedule.schedule_id');
        $this->db->where('funds_developer_schedule.project_id', $pid);
        $this->db->where('EXTRACT(YEAR_MONTH FROM funds_payment_schedule.schedule_date)<=', date('Ym', strtotime($payoff_date)));
        $this->db->where('dev_override_default_status <>', 'A');
        $this->db->where('dev_override_default_amount >', '0');
        $query  = $this->db->get();
        $result = $query->result_array();
        //  echo $this->db->last_query();die;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_late_waive_loan($payoff_date, $pid)
    {
        
        $this->db->select("sum(funds_developer_loan_schedule.dev_override_late_amount) as ov_late_amount,sum(funds_developer_loan_schedule.dev_override_default_amount) as ov_def_amount");
        $this->db->from('funds_developer_loan_schedule');
        $this->db->join('funds_payment_loan', 'funds_payment_loan.loan_id=funds_developer_loan_schedule.loan_id');
        $this->db->where('funds_developer_loan_schedule.project_id', $pid);
        $this->db->where('EXTRACT(YEAR_MONTH FROM funds_payment_loan.schedule_date)<=', date('Ym', strtotime($payoff_date)));
        $query  = $this->db->get();
        $result = $query->row_array();
        // echo $this->db->last_query();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_late_waive_loan_schedule($payoff_date, $pid)
    {
        
        $this->db->select("funds_payment_loan.schedule_date");
        $this->db->from('funds_developer_loan_schedule');
        $this->db->join('funds_payment_loan', 'funds_payment_loan.loan_id=funds_developer_loan_schedule.loan_id');
        $this->db->where('funds_developer_loan_schedule.project_id', $pid);
        $this->db->where('EXTRACT(YEAR_MONTH FROM funds_payment_loan.schedule_date)<=', date('Ym', strtotime($payoff_date)));
        $this->db->where('dev_override_late_status <>', 'A');
        $this->db->where('dev_override_late_amount >', '0');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    
    function get_late_waive_loan_default_schedule($payoff_date, $pid)
    {
        
        $this->db->select("funds_payment_loan.schedule_date");
        $this->db->from('funds_developer_loan_schedule');
        $this->db->join('funds_payment_loan', 'funds_payment_loan.loan_id=funds_developer_loan_schedule.loan_id');
        $this->db->where('funds_developer_loan_schedule.project_id', $pid);
        $this->db->where('EXTRACT(YEAR_MONTH FROM funds_payment_loan.schedule_date)<=', date('Ym', strtotime($payoff_date)));
        $this->db->where('dev_override_default_status <>', 'A');
        $this->db->where('dev_override_default_amount >', '0');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    
    function payment_term_remaining($project_id, $cur_date, $payoff_date)
    {
        if ($payoff_date != "") {
            $this->db->where('DATE(funds_payment_schedule.schedule_date)<=', $payoff_date);
        }
        $this->db->select("count(`schedule_id`)as cnt");
        $this->db->from('funds_payment_schedule');
        $this->db->where('project_id', $project_id);
        $this->db->where('DATE(funds_payment_schedule.schedule_date)>=', $cur_date);
        
        $query  = $this->db->get();
        $result = $query->row_array();
        // echo $this->db->last_query(); exit;
        return $result;
    }
    
    function payment_term_remaining_loan($project_id, $cur_date, $payoff_date)
    {
        if ($payoff_date != "") {
            $this->db->where('DATE(funds_payment_loan.schedule_date)<=', $payoff_date);
        }
        $this->db->select("count(`loan_id`)as cnt");
        $this->db->from('funds_payment_loan');
        $this->db->where('project_id', $project_id);
        $this->db->where('DATE(funds_payment_loan.schedule_date)>=', $cur_date);
        $query  = $this->db->get();
        $result = $query->row_array();
        // echo $this->db->last_query(); exit;
        return $result;
    }
    
    function get_prepayment_month($selected_date, $schedule_date, $pid, $payoff_date)
    {
        
        if ($payoff_date != "") {
            $this->db->where('DATE(funds_payment_schedule.schedule_date)<=', $payoff_date);
        }
        
        $this->db->select("funds_payment_schedule.schedule_date");
        $this->db->from('funds_payment_schedule');
        $this->db->where('funds_payment_schedule.project_id', $pid);
        $this->db->where('funds_payment_schedule.schedule_date between "' . $schedule_date . '" and  "' . $selected_date . '" ');
        $this->db->where('funds_payment_schedule.schedule_status', 'C');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();die;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_prepayment_month_loan($selected_date, $schedule_date, $pid, $payoff_date)
    {
        
        if($payoff_date != ""){
            $this->db->where('DATE(funds_payment_loan.schedule_date)<=', $payoff_date);
        }
        $this->db->select("funds_payment_loan.schedule_date");
        $this->db->from('funds_payment_loan');
        $this->db->where('funds_payment_loan.project_id', $pid);
        $this->db->where('funds_payment_loan.schedule_date between "' . $schedule_date . '" and  "' . $selected_date . '" ');
        $this->db->where('funds_payment_loan.schedule_status', 'C');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();die;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    
    
    
    /*############################################## Referral Code #########################################################*/
    
    function get_code_generation($arr_where)
    {
        $arr_result = $this->db->select('SUBSTRING(funds_users.first_name,1,2) as first_letter, SUBSTRING(funds_users.last_name,1,2) as second_letter, funds_users.user_id', false)->where($arr_where)->get('funds_users')->row_array(); // echo $this->db->last_query();exit;
        $arr_val    = strtoupper($arr_result['first_letter'] . '' . $arr_result['second_letter'] . '' . $arr_result['user_id']);
        return $arr_val;
    }
    
    function check_referal_code($arr_where)
    {
        
        $arr_result = $this->db->where($arr_where)->join('funds_users', 'funds_users.user_id = funds_referrals.referral_user_id')->order_by('funds_referrals.referral_id', 'DESC')->get('funds_referrals')->result_array(); //echo $this->db->last_query();exit;
        return $arr_result;
    }
    
    function get_investment_details($arr_where)
    {
        $user_id = $arr_where['funds_payments.user_id'];
        //$user_id = $arr_where['user_id'];
        $arr_result = $this->db->select('sum(funds_payments.amount_per_share * funds_share_holders.number_shares) as invest_amount')->where('(funds_users.user_id = "'.$user_id.'" or funds_users.parent_user = "'.$user_id.'")')->where('funds_payments.payment_status <> "D"')->join('funds_payments', 'funds_payments.share_holder_id = funds_share_holders.share_holder_id')->join('funds_users', 'funds_users.user_id = funds_payments.user_id')->get('funds_share_holders')->row_array(); //echo $this->db->last_query();exit;
        if (!empty($arr_result) && $arr_result['invest_amount'] >= 5000) {
            return $arr_result['invest_amount'];
        } else {
            return false;
        }
        
    }
    
    function check_referal_invest($arr_where)
    { //print_r($arr_where);
        //referral_user_id,referral_user_invest_status
        $arr_data = "(funds_users.user_id = '".$arr_where['funds_referrals.referral_user_id']."' or funds_users.parent_user = '".$arr_where['funds_referrals.referral_user_id']."' ) and  funds_referrals.referral_user_invest_status = '".$arr_where['referral_user_invest_status']."' "; 
        $arr_result = $this->db->where($arr_data)->order_by('funds_referrals.referral_id', 'DESC')->join('funds_users', 'funds_users.user_id = funds_referrals.referral_user_id')->get('funds_referrals')->result_array(); //echo $this->db->last_query();exit;
        return $arr_result;
    }
    
    
    
    function get_main_user_referral($arr_where)
    {
        $arr_result = $this->db->select('sum(funds_payments.amount_per_share * funds_share_holders.number_shares) as invest_amount')->where($arr_where)->where('funds_payments.payment_status <> "D"')->where('funds_payments.IsDeleted','N')->join('funds_payments', 'funds_payments.share_holder_id = funds_share_holders.share_holder_id')->get('funds_share_holders')->row_array(); //echo $this->db->last_query();exit;
        if (!empty($arr_result) && $arr_result['invest_amount'] >= 5000) {
            return $arr_result['invest_amount'];
        } else {
            return false;
        }
        
    }
    
    /*############################################## Referral Code #########################################################*/
    
    #---------------------------------------------------------------------
    function compare_sevice_override($uid = NULL, $pid = NULL)
    {
        $whr              = array(
            'user_id' => $uid
        );
        $user_details     = $this->get_row('funds_users', 'user_id,parent_user,user_servicefee_override', $whr);
        $project_details  = $this->get_row('funds_projects', 'project_servicing_fee,project_id', array(
            'project_id' => $pid
        ));
        $pservicefee      = $project_details['project_servicing_fee'];
        $user_ovrride_fee = $user_details['user_servicefee_override'];
        if ($pservicefee != 0) {
            if ($user_ovrride_fee <= 100) {
                $service_override = $user_ovrride_fee;
            } else {
                $service_override = 100;
            }
        } else {
            $service_override = 0;
        }
        return $service_override;
    }
    #-------------------------------------------------Override exist or not------------------------------------------------------------------
    function override_value_exist($user_id = NULL)
    {
        
        $this->db->select("user_interest_rate");
        $this->db->from('funds_users');
        $this->db->where('user_id', $user_id);
        $this->db->where('user_status', 'A');
        
        $query  = $this->db->get();
        $result = $query->row_array();
        if (($result['user_interest_rate'] != '')) {
            return true;
        } else {
            return false;
        }
    }
    
    #------------------------------------------------- Compare override------------------------------------------------------------------
    function compare_override_value($user_id = NULL, $project_id = NULL)
    {
        $whr              = array(
            'user_id' => $user_id
        );
        $user_details     = $this->get_row('funds_users', 'user_interest_rate', $whr);
        $project_details  = $this->get_row('funds_projects', 'fee_total', array(
            'project_id' => $project_id
        ));
        $pservicefee      = $project_details['fee_total'];
        $user_ovrride_fee = $user_details['user_interest_rate'];
        
        if ($user_ovrride_fee > $pservicefee) {
            return true;
        } else {
            return false;
        }
        
        
    }
    
    
    function main_account_name($user_id = NULL)
    {
        $this->db->select('first_name,last_name');
        $this->db->from('funds_users');
        $this->db->where('user_id', $user_id);
        $result = $this->db->get();
        $res    = $result->row_array();
        $name   = ucfirst(strtolower($res['first_name'])) . " " . $res['last_name'];
        return $name;
        
    }
    
    function get_missing_payments($outsourced=NULL)
    {
        
        if($outsourced!=''){
            $this->db->where('project_servicing_outsourced','Y');
        }else{
            $this->db->where('project_servicing_outsourced','N');
        }
        $curdate = date('Y-m-d');
        $this->db->select('funds_projects.project_id,funds_payment_schedule.schedule_id,funds_projects.project_name,funds_projects.developer_id,funds_payment_schedule.schedule_date, funds_payment_schedule.schedule_amount,funds_projects.project_dev_payment_due,funds_projects.project_dev_payment_charge_off,
            funds_projects.project_late_fee,funds_projects.project_default_interest,funds_projects.project_type,funds_projects.project_payoff_date,funds_payment_schedule.schedule_status,funds_developer_schedule.schedule_payment_status,funds_developer_schedule.schedule_ach_status,funds_developer_schedule.ach_success_date,funds_developer_schedule.dev_schedule_id,funds_developer_schedule.schedule_payment_success,funds_developer_schedule.ach_rejection_date,funds_developer_schedule.ach_rejection_code,funds_developer_schedule.payment_date');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_projects', 'funds_projects.project_id=funds_payment_schedule.project_id');
        $this->db->join('funds_developer_schedule', 'funds_developer_schedule.schedule_id=funds_payment_schedule.schedule_id','left');
        $this->db->where('DATE(schedule_date) <=', $curdate);
       $this->db->where("( (funds_projects.project_payoff_date is NULL OR funds_projects.project_payoff_date ='0000-00-00')  OR(funds_projects.project_payoff_date is not null AND funds_projects.project_payoff_date <>'0000-00-00' AND DATE(funds_projects.project_payoff_date) >= '".$curdate."'))");
        $this->db->where('funds_projects.project_type <>', 'PC');
        $this->db->where('funds_projects.project_dev_payment_due', 'N');
        $this->db->where('funds_projects.project_dev_payment_charge_off', 'N');
       
        // $this->db->where('(funds_payment_schedule.schedule_status = "C" or (funds_payment_schedule.schedule_status = "A" and funds_developer_schedule.schedule_payment_success = "I" and funds_developer_schedule.ach_success_status !=0 ) )');
        $this->db->where('(funds_payment_schedule.schedule_status = "C" or (funds_payment_schedule.schedule_status = "A" and funds_developer_schedule.schedule_payment_success = "I") )');
        $this->db->where('funds_projects.project_status', 'A');
        
        $this->db->where('funds_projects.IsDeleted','N');
        $this->db->where('funds_projects.project_type !=','D');
        $this->db->where('(funds_projects.project_construction_loan = funds_payment_schedule.costruction_draw_status)');
        $this->db->order_by('date(funds_payment_schedule.schedule_date)', 'ASC');
        $this->db->group_by('funds_payment_schedule.project_id');
         
        $result = $this->db->get();

        return $result->result_array(); 
    }


    function get_missing_payments_project($outsourced=NULL)
    {   
        if($outsourced!=''){
            $this->db->where('project_servicing_outsourced','Y');
        }else{
            $this->db->where('project_servicing_outsourced','N');
        }
        
        $curdate = date('Y-m-d');
        $this->db->select('funds_projects.project_id');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_projects', 'funds_projects.project_id=funds_payment_schedule.project_id');
        $this->db->join('funds_developer_schedule', 'funds_developer_schedule.schedule_id=funds_payment_schedule.schedule_id','left');
        $this->db->where('DATE(schedule_date) <=', $curdate);
        $this->db->where("( (funds_projects.project_payoff_date is NULL OR funds_projects.project_payoff_date ='0000-00-00')  OR(funds_projects.project_payoff_date is not null AND funds_projects.project_payoff_date <>'0000-00-00' AND DATE(funds_projects.project_payoff_date) >= '".$curdate."'))");
        $this->db->where('funds_projects.project_type <>', 'PC');
        $this->db->where('funds_projects.project_dev_payment_due', 'N');
        $this->db->where('funds_projects.project_dev_payment_charge_off', 'N');
        // $this->db->where('(funds_payment_schedule.schedule_status = "C" or (funds_payment_schedule.schedule_status = "A" and funds_developer_schedule.schedule_payment_success = "I" and funds_developer_schedule.ach_success_status !=0 ) )');
        $this->db->where('(funds_payment_schedule.schedule_status = "C" or (funds_payment_schedule.schedule_status = "A" and funds_developer_schedule.schedule_payment_success = "I") )');
        $this->db->where('funds_projects.project_status', 'A');
        $this->db->where('funds_projects.IsDeleted','N');
        $this->db->where('funds_projects.project_type !=','D');
        $this->db->where('(funds_projects.project_construction_loan = funds_payment_schedule.costruction_draw_status)');
        $this->db->order_by('date(funds_payment_schedule.schedule_date)', 'ASC');
        $this->db->group_by('funds_payment_schedule.project_id');
        $result = $this->db->get();
        $arr = $result->result_array();
        $result1 = array();
        foreach ($arr as  $value) {
            $result1[] = $value['project_id'];
        }
        return $result1; 
    }
    
    function get_missing_loan_payments($outsourced=NULL)
    {
        if($outsourced!=''){
            $this->db->where('project_servicing_outsourced','Y');
        }else{
            $this->db->where('project_servicing_outsourced','N');
        }
        $curdate = date('Y-m-d');
        $this->db->select('funds_projects.project_id,funds_payment_loan.loan_id,funds_projects.project_name,funds_projects.developer_id, funds_payment_loan.schedule_date, funds_payment_loan.schedule_amount,funds_projects.project_dev_payment_due,funds_projects.project_dev_payment_charge_off,
            funds_projects.project_late_fee,funds_projects.project_default_interest,funds_projects.project_type,funds_projects.project_payoff_date,project_extend_loan,funds_payment_loan.schedule_status,funds_developer_loan_schedule.schedule_payment_status,funds_developer_loan_schedule.schedule_ach_status,funds_developer_loan_schedule.ach_success_date,funds_developer_loan_schedule.dev_loan_id,funds_developer_loan_schedule.schedule_payment_success,funds_developer_loan_schedule.ach_rejection_date,funds_developer_loan_schedule.ach_rejection_code,funds_developer_loan_schedule.payment_date');
        $this->db->from('funds_payment_loan');
        $this->db->join('funds_developer_loan_schedule', 'funds_developer_loan_schedule.loan_id=funds_payment_loan.loan_id','left');
        $this->db->join('funds_projects', 'funds_projects.project_id=funds_payment_loan.project_id');
        $this->db->where('DATE(schedule_date) <=', $curdate);
        $this->db->where("( (funds_projects.project_payoff_date is NULL OR funds_projects.project_payoff_date ='0000-00-00')  OR(funds_projects.project_payoff_date is not null AND funds_projects.project_payoff_date <>'0000-00-00'))");
        $this->db->where('funds_projects.project_type <>', 'PC');
        $this->db->where('funds_projects.project_dev_payment_due', 'N');
        $this->db->where('funds_projects.project_dev_payment_charge_off', 'N');
        
        // $this->db->where('(funds_payment_loan.schedule_status = "C" or (funds_payment_loan.schedule_status = "A" and funds_developer_loan_schedule.schedule_payment_success = "I" and funds_developer_loan_schedule.ach_success_status !=0) )');
        $this->db->where('(funds_payment_loan.schedule_status = "C" or (funds_payment_loan.schedule_status = "A" and funds_developer_loan_schedule.schedule_payment_success = "I") )');
        
        $this->db->where('funds_projects.project_status', 'A');
        $this->db->where('funds_projects.project_extend_loan', 'Y');
       // $this->db->where('project_servicing_outsourced','N');
        $this->db->where('funds_projects.IsDeleted','N');
        $this->db->where('funds_projects.project_type !=','D');
        $this->db->order_by('date(funds_payment_loan.schedule_date)', 'ASC');
        $this->db->group_by('funds_payment_loan.project_id');
        $result1 = $this->db->get();
        $new_array = $this->get_missing_payments_project();
       
        foreach ($result1 as $key => $value) {
            # code...
            if(!in_array($value['project_id'], $new_array) ){

                $result['project_id'] = $value['project_id'];
                $result['loan_id'] = $value['loan_id'];
                $result['project_name'] = $value['project_name'];
                $result['developer_id'] = $value['developer_id'];
                $result['schedule_date'] = $value['schedule_date'];
                $result['schedule_amount'] = $value['schedule_amount'];
                $result['project_dev_payment_due'] = $value['project_dev_payment_due'];
                $result['project_dev_payment_charge_off'] = $value['project_dev_payment_charge_off'];
                $result['project_late_fee'] = $value['project_late_fee'];
                $result['project_default_interest'] = $value['project_default_interest'];
                $result['project_type'] = $value['project_type'];
                $result['project_payoff_date'] = $value['project_payoff_date'];
                $result['project_extend_loan'] = $value['project_extend_loan'];
            }

        }
        return $result1->result_array(); //$result;
        
    }
    function get_seo_data($str)
    {
        $this->db->select('*')->from('funds_seo_pages')->join('funds_seo_metadata', 'funds_seo_metadata.page_id=funds_seo_pages.page_id')->where('funds_seo_pages.page_url', $str);
        $result = $this->db->get();
        //echo $this->db->last_query();die;
        return $result->row_array();
    }
    function get_det_bulk($date)
    {
        
        
        
        $this->db->select('*');
        $this->db->from('funds_bulk_withdraw_funds');
        $this->db->join('funds_users', 'funds_users.user_id=funds_bulk_withdraw_funds.user_id');
        $this->db->where('funds_bulk_withdraw_funds.withdraw_date', $date);
        $query = $this->db->get();
        
        $result = $query->result_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_det_bulk_new($uid, $date)
    {
        
        
        
        $this->db->select('*');
        $this->db->from('funds_bulk_withdraw_funds');
        $this->db->join('funds_users', 'funds_users.user_id=funds_bulk_withdraw_funds.user_id');
        $this->db->where('funds_bulk_withdraw_funds.withdraw_date', $date);
        $this->db->where('(funds_users.user_id = ' . $uid . ' or funds_users.parent_user = ' . $uid . ')');
        
        $query = $this->db->get();
        
        $result = $query->result_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    #-----------------------------------------------------------------------------
    function cc_send_user_email($from = "Greetings@sharestates.com", $to, $subject, $body, $attachment = NULL, $cc = NULL)
    {

       
        
        if($from==""){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }elseif($from == "LoanServicing@sharestates.com"){
            $name = "Sharestates LoanServicing";
        }elseif($from == "processing@sharestates.com"){
            $name = "Sharestates";
        }elseif($from == "investors@sharestates.com"){
            $name = "Sharestates";
        }else{
            $name = "Sharestates";
        }

       if($invoice!='' && $from != "LoanServicing@sharestates.com") {
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: allen@sharestates.com' . "\r\n".'Reply-To: steven@sharestates.com' . "\r\n";
        }else if($invoice!='' && $from == "LoanServicing@sharestates.com") {
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: allen@sharestates.com' . "\r\n". 'Reply-To: steven@sharestates.com' . "\r\n". "\r\n". 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }else if($from == "LoanServicing@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }else if($from == "processing@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: processing@sharestates.com' . "\r\n";
        }else if($from == "investors@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: investors@sharestates.com' . "\r\n";
        }else{
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: Greetings@sharestates.com' . "\r\n";
        }
        if ($cc != '') {
            $headers .= 'cc: ' . $cc . "\r\n";
            
            $headers .= 'Bcc: hemaravi7878@gmail.com' . "\r\n";
        }
        $headers .= 'X-Mailer: PHP/' . phpversion();
        return mail($to, $subject, $body, $headers);
    }
    
    function convert_number_to_words($number)
    {
        
        $hyphen      = '-';
        $conjunction = ' and ';
        $separator   = ', ';
        $negative    = 'negative ';
        $decimal     = ' point ';
        $dictionary  = array(
            0 => 'zero',
            1 => 'one',
            2 => 'two',
            3 => 'three',
            4 => 'four',
            5 => 'five',
            6 => 'six',
            7 => 'seven',
            8 => 'eight',
            9 => 'nine',
            10 => 'ten',
            11 => 'eleven',
            12 => 'twelve',
            13 => 'thirteen',
            14 => 'fourteen',
            15 => 'fifteen',
            16 => 'sixteen',
            17 => 'seventeen',
            18 => 'eighteen',
            19 => 'nineteen',
            20 => 'twenty',
            30 => 'thirty',
            40 => 'fourty',
            50 => 'fifty',
            60 => 'sixty',
            70 => 'seventy',
            80 => 'eighty',
            90 => 'ninety',
            100 => 'hundred',
            1000 => 'thousand',
            1000000 => 'million',
            1000000000 => 'billion',
            1000000000000 => 'trillion',
            1000000000000000 => 'quadrillion',
            1000000000000000000 => 'quintillion'
        );
        
        if (!is_numeric($number)) {
            return false;
        }
        
        if (($number >= 0 && (int) $number < 0) || (int) $number < 0 - PHP_INT_MAX) {
            // overflow
            trigger_error('convert_number_to_words only accepts numbers between -' . PHP_INT_MAX . ' and ' . PHP_INT_MAX, E_USER_WARNING);
            return false;
        }
        
        if ($number < 0) {
            return $negative . convert_number_to_words(abs($number));
        }
        
        $string = $fraction = null;
        
        if (strpos($number, '.') !== false) {
            list($number, $fraction) = explode('.', $number);
        }
        
        switch (true) {
            case $number < 21:
                $string = $dictionary[$number];
                break;
            case $number < 100:
                $tens   = ((int) ($number / 10)) * 10;
                $units  = $number % 10;
                $string = $dictionary[$tens];
                if ($units) {
                    $string .= $hyphen . $dictionary[$units];
                }
                break;
            case $number < 1000:
                $hundreds  = $number / 100;
                $remainder = $number % 100;
                $string    = $dictionary[$hundreds] . ' ' . $dictionary[100];
                if ($remainder) {
                    $string .= $conjunction . convert_number_to_words($remainder);
                }
                break;
            default:
                $baseUnit     = pow(1000, floor(log($number, 1000)));
                $numBaseUnits = (int) ($number / $baseUnit);
                $remainder    = $number % $baseUnit;
                $string       = convert_number_to_words($numBaseUnits) . ' ' . $dictionary[$baseUnit];
                if ($remainder) {
                    $string .= $remainder < 100 ? $conjunction : $separator;
                    $string .= convert_number_to_words($remainder);
                }
                break;
        }
        
        if (null !== $fraction && is_numeric($fraction)) {
            $string .= $decimal;
            $words = array();
            foreach (str_split((string) $fraction) as $number) {
                $words[] = $dictionary[$number];
            }
            $string .= implode(' ', $words);
        }
        
        return $string;
        
    }
    /*Bulk withdraw*/
    function get_last_debited_date($user_id,$type,$parent_id)
    {
        $this->db->select('funds_credit_account.credit_date');
        $this->db->from('funds_credit_account');
        $this->db->join('funds_users', 'funds_users.user_id = funds_credit_account.user_id');
        if ($type == 'I') {
            $this->db->where('(funds_users.user_id = ' . $parent_id . ')');
        } else {
            $this->db->where('(funds_users.user_id = ' . $parent_id . ' or funds_users.parent_user = ' . $parent_id . ')');
        }
        $this->db->where('funds_credit_account.credit_status','D');
        $this->db->where('funds_credit_account.project_id',0);
        //$this->db->where('funds_credit_account.user_id',$user_id);
        $this->db->order_by('funds_credit_account.credit_id', 'DESC');
        $query  = $this->db->get();
        $result = $query->row_array();
       // echo $this->db->last_query();exit;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
     /*function credit_amount_cbulk($user_id, $type = NULL, $date = NULL)
    {
        $this->db->select('sum(funds_credit_account.credit_amount) as amt');
        $this->db->from('funds_credit_account');
        $this->db->join('funds_users', 'funds_users.user_id = funds_credit_account.user_id');
        if ($type == 'I') {
            $this->db->where('(funds_users.user_id = ' . $user_id . ')');
        } else {
            $this->db->where('(funds_users.user_id = ' . $user_id . ' or funds_users.parent_user = ' . $user_id . ')');
        }
        if ($date != '') {
            $this->db->where('funds_credit_account.credit_date >= "' . $date . '"');
        }
        $this->db->where('funds_credit_account.credit_status', 'C');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }*/
 function credit_amount_cbulk($user_id, $type = NULL, $date = NULL)
    {
        $this->db->select('sum(funds_credit_account.credit_amount) as amt');
        $this->db->from('funds_credit_account');
        $this->db->join('funds_users', 'funds_users.user_id = funds_credit_account.user_id');
        if ($type == 'I') {
            $this->db->where('(funds_users.user_id = ' . $user_id . ')');
        } else {
            $this->db->where('(funds_users.user_id = ' . $user_id . ' or funds_users.parent_user = ' . $user_id . ')');
        }
        if ($date != '') {
            $this->db->where('funds_credit_account.credit_date >= "' . $date . '"');
        }
        $this->db->where('funds_credit_account.credit_status', 'C');
       // $this->db->where('funds_credit_account.project_id', 'C');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function credit_amount_dbulk($user_id, $type = NULL, $date = NULL)
    {
        $this->db->select('sum(funds_credit_account.credit_amount) as amt');
        $this->db->from('funds_credit_account');
        $this->db->join('funds_users', 'funds_users.user_id = funds_credit_account.user_id');
        if ($type == 'I') {
            $this->db->where('(funds_users.user_id = ' . $user_id . ')');
        } else {
            $this->db->where('(funds_users.user_id = ' . $user_id . ' or funds_users.parent_user = ' . $user_id . ')');
        }
        if ($date != '') {
            $this->db->where('funds_credit_account.credit_date > "' . $date . '"');
        }
        $this->db->where('funds_credit_account.credit_status', 'D');
       // $this->db->where('funds_credit_account.project_id', 'C');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }

    function Is_delete($tbl, $fld, $id)
    {
        $this->db->select('first_name,last_name');
        $this->db->from('funds_users');
        $this->db->where('user_id', $this->session->userdata('user_id'));
        $result = $this->db->get();
        $user_details = $result->row_array();
        $user_name = $user_details['first_name']." ".$user_details['last_name'];

        $data  = array('IsDeleted'=>'Y', 'UpdatedBy'=>$user_name, 'UpdatedDate'=>date('Y-m-d H:i:s'));
        $this->db->where($fld, $id);
        $this->db->update($tbl, $data);
    }
    #---------------------------------------------------------------
    function get_construction_sum($project_id){
        $this->db->select("sum(c.c_loan_amount) as construction_amount");
        $this->db->from("funds_project_construction_loan c");
        $this->db->where("c.project_id",$project_id);
        $res    = $this->db->get();
        $result = $res->row_array();
        if(!empty($result)){
            return $result;
        }else{
            return false;
        }
        
    }
    function construction_dev_schedule_list($project_id, $shedule_status = NULL, $draw_status = NULL, $order_staus = NULL, $type,$select_status=NULL,$investor_date=NULL,$arr_where=NULL)
    {
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        if ($shedule_status != "") {
            if($shedule_status=='C'){
                $this->db->where('(y.schedule_status="C" OR d.schedule_payment_success="I")');
            }else{
                $this->db->where('y.schedule_status', $shedule_status);
            }
        }
        if($investor_date!="" && $investor_date!="0000-00-00"){
            $inv_year_month =date('Ym',strtotime($investor_date));
            $this->db->where("EXTRACT(YEAR_MONTH FROM y.schedule_date) <",$inv_year_month);
        }
        if($select_status!=""){
            $this->db->select('sum(y.schedule_amount) as total_pending_construction');
        }else{
            $this->db->select('y.schedule_id,y.user_id,y.project_id,y.schedule_amount,y.schedule_date,y.schedule_status,y.payment_default_fee,y.payment_late_fee,y.payment_principal_amount,y.costruction_draw_status,y.payment_clearance_date');
        }
        $this->db->from('funds_payment_schedule y');
        $this->db->join('funds_projects p', 'p.project_id = y.project_id');
        $this->db->join('funds_developer_schedule d','d.schedule_id = y.schedule_id','left');
        $this->db->where('y.costruction_draw_status','Y');
        $this->db->where('p.project_id', $project_id);
        if (!empty($order_staus)) {
            $this->db->order_by($order_staus, $type);
        }
        $query  = $this->db->get();
       //echo $this->db->last_query();exit;
        $result = $query->result_array();
        return $result;
        
        
    }
    function last_dev_schedule_list_payment($arr_where=NULL){
       if(!empty($arr_where)){
        $this->db->where($arr_where);
       }
        $this->db->select('funds_payment_schedule.*,d.schedule_payment_success');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_projects', 'funds_projects.project_id = funds_payment_schedule.project_id');
        $this->db->join('funds_developer_schedule d','d.schedule_id = funds_payment_schedule.schedule_id','left');
        $this->db->where('(funds_projects.project_construction_loan  = funds_payment_schedule.costruction_draw_status)');
        $this->db->order_by('funds_payment_schedule.schedule_date', 'DESC');
        $query  = $this->db->get();
        $result = $query->result_array();
        return $result;
    }
    function last_dev_loan_schedule_list_payment($arr_where=NULL){
        if(!empty($arr_where)){
         $this->db->where($arr_where);
        }
        $this->db->select('funds_payment_loan.*,d.schedule_payment_success');
        $this->db->from('funds_payment_loan');
        $this->db->join('funds_projects', 'funds_projects.project_id = funds_payment_loan.project_id');
        $this->db->join('funds_developer_loan_schedule d','d.loan_id = funds_payment_loan.loan_id','left');
        $this->db->order_by('funds_payment_loan.schedule_date', 'DESC');
        $query  = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    /*User mail*/
    function get_cashout_details_mail($ach_date)
    {
        //$date = date('Y-m-d');
        $this->db->select('*,sum(fund_bank.bank_routing_num) as route_num');
        $this->db->from('funds_distribution_cashout');
        $this->db->join('fund_bank', 'fund_bank.bank_id =  funds_distribution_cashout.bank_name');
        $this->db->join('funds_users', 'funds_users.user_id=funds_distribution_cashout.user_id');
        $this->db->where('funds_distribution_cashout.bank_name IS NOT NULL');
        $this->db->where('funds_distribution_cashout.payment_ach_status', 1);
        $this->db->where('funds_distribution_cashout.ach_success_status', 0);
        $this->db->where('funds_distribution_cashout.ach_success_date',$ach_date);
        $this->db->group_by('funds_distribution_cashout.cashout_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        return $result;
    }

    function get_cashout_details_mail_new($uid, $date)
    {
        
         //$date = date('Y-m-d');
        $this->db->select('*,sum(fund_bank.bank_routing_num) as route_num,fund_bank.bank_name as bank_names,funds_distribution_cashout.bank_name as bank_ids');
        $this->db->from(' funds_distribution_cashout');
        $this->db->join('fund_bank', 'fund_bank.bank_id =  funds_distribution_cashout.bank_name');
        $this->db->join('funds_users', 'funds_users.user_id=funds_distribution_cashout.user_id');
        $this->db->where('funds_distribution_cashout.bank_name IS NOT NULL');
        $this->db->where('funds_distribution_cashout.payment_ach_status', 1);
        $this->db->where('funds_distribution_cashout.ach_success_date',$date);
        $this->db->where('funds_distribution_cashout.ach_success_status', 0);
        $this->db->where('(funds_users.user_id = ' . $uid . ' or funds_users.parent_user = ' . $uid . ')');
        $this->db->group_by('funds_distribution_cashout.cashout_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        return $result;
   
    }
function get_cashout_details_manual()
    {
        //$date = date('Y-m-d');
        $this->db->select('*,sum(fund_bank.bank_routing_num) as route_num');
        $this->db->from(' funds_distribution_cashout');
        $this->db->join('fund_bank', 'fund_bank.bank_id =  funds_distribution_cashout.bank_name');
        $this->db->where('funds_distribution_cashout.bank_name IS NOT NULL');
        //$this->db->where('funds_distribution_cashout.payment_ach_status', 0);
        $this->db->where('funds_distribution_cashout.cashout_id', 2934);
       
        $this->db->group_by('funds_distribution_cashout.cashout_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        return $result;
    }
    


function get_extension_fees()
{
     
    $this->db->select('funds_extension_payments.payment_amount,funds_extension_payments.extnd_id,fund_bank.bank_routing_num,fund_bank.bank_acc_no,fund_bank.bank_nickname,fund_bank.bank_acc_type');
    $this->db->from('funds_extension_payments');
    $this->db->join('funds_projects', 'funds_projects.project_id = funds_extension_payments.project_id');
    $this->db->join('fund_bank', 'fund_bank.bank_id = funds_extension_payments.payment_bank_id');
    $this->db->where('funds_extension_payments.payment_ach_status', '0');
    $this->db->where('funds_extension_payments.payment_amount >', '0');
    $this->db->order_by('funds_extension_payments.extnd_id', 'DESC');
    $query  = $this->db->get();
    $result = $query->result_array(); 
    if(!empty($result)) {
        foreach($result as $key => $data){

            $extend_fees_array[$key]['payment_amount']   = $data['payment_amount'];
            $extend_fees_array[$key]['bank_routing_num'] = $data['bank_routing_num'];
            $extend_fees_array[$key]['bank_acc_no']      = $data['bank_acc_no'];
            $extend_fees_array[$key]['bank_nickname']    = $data['bank_nickname'];
            $extend_fees_array[$key]['dev_schedule_id']  = $data['extnd_id'];
            $extend_fees_array[$key]['bank_acc_type']    = $data['bank_acc_type'];

        }
    }else{
        $extend_fees_array = array();
    }
    return $extend_fees_array;
}
 function ach_process_payment($schdate,$arr_where=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $sdate = date('Y-m-d',strtotime($schdate));
        $this->db->select('d.schedule_payment_success,d.schedule_ach_status,d.ach_success_status,d.ach_rejection_code,ach_rejection_date,sum(d.payment_amount) as return_amount');
        $this->db->from('funds_developer_schedule d');
        $this->db->join('funds_payment_schedule p','p.schedule_id = d.schedule_id');
       // $this->db->where('(d.ach_success_status ="1" or d.ach_success_status ="2")');
        $this->db->where('(d.schedule_payment_success ="I")');
        $this->db->where('DATE(p.schedule_date)<="'.$sdate.'"');
        $res    = $this->db->get();
        $result =$res->result_array();
        if(!empty($result))
            return $result;
        else
            return false;
    }
    function loan_ach_process_payment($schdate,$arr_where=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $sdate = date('Y-m-d',strtotime($schdate));
        $this->db->select('dl.schedule_payment_success,dl.schedule_ach_status,dl.ach_success_status,dl.ach_rejection_code,dl.ach_rejection_date,sum(dl.payment_amount) as return_amount');
        $this->db->from('funds_developer_loan_schedule dl');
        $this->db->join('funds_payment_loan l','l.loan_id = dl.loan_id');
        // $this->db->where('(dl.ach_success_status ="1" or dl.ach_success_status ="2")');
        $this->db->where('(dl.schedule_payment_success ="I")');
        $this->db->where('DATE(l.schedule_date)<="'.$sdate.'"');
        $res    = $this->db->get();
        // echo $this->db->last_query();exit;
        $result = $res->result_array();
        if(!empty($result))
            return $result;
        else
            return false;
    }

    function get_individual_balance($user_id){
       
        $list           = $this->get_row('funds_users',"first_name,last_name,sub_user_type,(CASE sub_user_type WHEN 'E' THEN 'Entity' WHEN 'T' THEN 'Trust' WHEN 'J' THEN 'Joint' ELSE 'Individual' END) as sub_status,parent_user,user_cashout_type,autopay_master",array('user_id'=>$user_id));
        if($list['parent_user']==0){ 
          $main_id      = $user_id;
          $autostatus   = $list['user_cashout_type'];
          $main_status  = $list['autopay_master'];
        }else{
          $main_id      = $list['parent_user'];
          $parent_where = array('user_id'=>$main_id);
          $main_user    = $this->get_row('funds_users','autopay_master,user_cashout_type',$parent_where);
          $main_status  = $main_user['autopay_master'];
          $autostatus   = $main_user['user_cashout_type'];
        }
       
        $individual_account_balance   = $this->get_account_credit_users($user_id,'I');
        
        $total_balance                = $this->get_account_credit_users($main_id);
        $available_amount             = 0;
        if($individual_account_balance>0){
          if($total_balance >$individual_account_balance){
            $available_amount         = $individual_account_balance;
          }else{
            $available_amount         = $total_balance;
          }
        }
        if($available_amount<0){
          $available_amount = 0;
        }
        if($main_status=='Y'){
          $auto_withdraw_on     = $this->user->get_autocashout_amount($user_id,'I',$autostatus);
        }else{
          $auto_withdraw_on     = 0;
        }
        $balance_auto_on        =  (($available_amount)-($auto_withdraw_on));//round(floor($available_amount* 100) / 100, 2)-round(floor($auto_withdraw_on* 100) / 100, 2);//
        if($balance_auto_on<0){
         $balance_auto_on       = 0;
        }
         $username              = $list['first_name'].' '.$list['last_name'];
        if($list['sub_user_type']=='J'){
          $username =$list['sub_jacc_first_name'].' '.$list['sub_jacc_last_name'];
        }
        $result['balance_auto_on']=$balance_auto_on; //round(floor($balance_auto_on* 100) / 100, 2);//
        $result['sub_status']     =$list['sub_status'];
        $result['username']       =$username;
        $result['parent_user_id'] =$main_id;
       return $result;
  }

  function get_all_pastdues($schedule_date,$current_date,$project_id) //test
  {
        //$current_date = date('Y-m-d');
        $this->db->select('funds_payment_schedule.schedule_date,funds_payment_schedule.schedule_status');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_developer_schedule d','d.schedule_id = funds_payment_schedule.schedule_id','left');
        $this->db->join('funds_projects p','p.project_id = funds_payment_schedule.project_id');
        $this->db->where('(p.project_construction_loan = funds_payment_schedule.costruction_draw_status)');
        $this->db->where('(funds_payment_schedule.schedule_status ="C" OR d.schedule_payment_success = "I")');
        $this->db->where('funds_payment_schedule.project_id',$project_id);
        $this->db->where('DATE(schedule_date)>="'.$schedule_date.'"');
        $this->db->where('DATE(schedule_date)<="'.$current_date.'"');
        $this->db->group_by('funds_payment_schedule.schedule_id');
        $res    = $this->db->get();
        $result =$res->result_array();
       // print_r($result);exit;
        $new_date = array();
        // if(!empty($result)){
            $x=0;
            foreach($result as $data){
               $day = date('d',strtotime($data['schedule_date']));
               if($day=='31' || $day == '30'){
                 $data['schedule_date'] = date('Y-m-d',strtotime($data['schedule_date'].'+1 day'));
               }
              // $new_date[] = date('F',strtotime($data['schedule_date']));
               $new_date[$x]['datemonth'] = date('F',strtotime($data['schedule_date']));
               $new_date[$x]['fulldate']  = date('Y-m-d',strtotime($data['schedule_date']));
               $new_date[$x]['schedule_status']= $data['schedule_status'];
                $x++;
            }
            return $new_date;
        // }else{
        //     return false;
        // }
  }
#------------------------------------------------
    function get_all_pastdues_loan($schedule_date,$current_date,$project_id){
        //$current_date = date('Y-m-d');
        $this->db->select('funds_payment_loan.schedule_date,funds_payment_loan.schedule_status');
        $this->db->from('funds_payment_loan');
        $this->db->join('funds_developer_loan_schedule d','d.loan_id = funds_payment_loan.loan_id','left');
        $this->db->where('funds_payment_loan.schedule_status','C');
        $this->db->where('funds_payment_loan.project_id',$project_id);
        $this->db->where('(funds_payment_loan.schedule_status ="C" OR d.schedule_payment_success = "I")');
        $this->db->where('DATE(funds_payment_loan.schedule_date)>="'.$schedule_date.'"');
        $this->db->where('DATE(funds_payment_loan.schedule_date)<="'.$current_date.'"');
         $this->db->group_by('funds_payment_loan.loan_id');
        $res    = $this->db->get();
        $result = $res->result_array();
        $new_date = array();
            $x=0;
            foreach($result as $data){
               $day = date('d',strtotime($data['schedule_date']));
               if($day=='31' || $day == '30'){
                 $data['schedule_date'] = date('Y-m-d',strtotime($data['schedule_date'].'+1 day'));
               }
              
               $new_date[$x]['datemonth'] = date('F',strtotime($data['schedule_date']));
               $new_date[$x]['fulldate']  = date('Y-m-d',strtotime($data['schedule_date']));
               $new_date[$x]['schedule_status']= $data['schedule_status'];
                $x++;
            }
           
            return $new_date;
        
    }
    #---------------------------------------------------------------------------------------
    function unpaid_late_def_month($schedule_date,$pid,$status){
        
     $this->db->select('y.schedule_date,y.override_late_amount,y.override_late_amount,
        y.override_default_status,y.override_default_amount');
     $this->db->from('funds_payment_schedule y');
     $this->db->where('y.project_id',$pid);
     if($status=="L"){
         $this->db->where('y.override_late_amount !=',0);
         $this->db->where('y.override_late_status','Y');
     }elseif($status=="D"){
         $this->db->where('y.override_default_amount !=',0);
         $this->db->where('y.override_default_status','Y');
     }
     $query  = $this->db->get();
     // echo $this->db->last_query();exit;
     $result = $query->result_array();
    
        if ($this->db->_error_message())
            return FALSE;
        else
            return $result;
    }

      #---------------------------------------------------------------------------------------
    function unpaid_late_def_month_last($schedule_date,$pid,$status,$order_type){
        
     $this->db->select('y.schedule_date,y.override_late_amount,y.override_late_amount,
        y.override_default_status,y.override_default_amount');
     $this->db->from('funds_payment_schedule y');
     $this->db->where('y.project_id',$pid);
     if($status=="L"){
         $this->db->where('y.override_late_amount !=',0);
         $this->db->where('y.override_late_status','Y');
     }elseif($status=="D"){
         $this->db->where('y.override_default_amount !=',0);
         $this->db->where('y.override_default_status','Y');
     }
    if($order_type!=""){
         $this->db->order_by('schedule_date',$order_type);
         $this->db->limit(1,0);
    }
     $query  = $this->db->get();
     // echo $this->db->last_query();exit;
     $result = $query->result_array();
    
        if ($this->db->_error_message())
            return FALSE;
        else
            return $result;
    }
    #---------------------------------------------------------------------------------------
    function unpaid_late_def_month_loan($schedule_date,$pid,$status){
        
     $this->db->select('l.schedule_date,
        l.override_late_amount,l.override_late_status,
        l.override_default_amount,l.override_default_status');
     $this->db->from('funds_payment_loan l');
     $this->db->where('l.project_id',$pid);
     if($status=="L"){
         $this->db->where('l.override_late_amount !=',0);
         $this->db->where('l.override_late_status','Y');
     }elseif($status=="D"){
         $this->db->where('l.override_default_amount !=',0);
         $this->db->where('l.override_default_status','Y');
     }
     $query  = $this->db->get();
     $result = $query->result_array();
        if ($this->db->_error_message())
            return FALSE;
        else
            return $result;
    }
    #---------------------------------------------------------------------------------------
    function unpaid_late_def_month_loan_last($schedule_date,$pid,$status,$order_type){
        
     $this->db->select('l.loan_id,l.schedule_date,
        l.override_late_amount,l.override_late_status,
        l.override_default_amount,l.override_default_status');
     $this->db->from('funds_payment_loan l');
     $this->db->where('l.project_id',$pid);
     if($status=="L"){
         $this->db->where('l.override_late_amount !=',0);
         $this->db->where('l.override_late_status','Y');
     }elseif($status=="D"){
         $this->db->where('l.override_default_amount !=',0);
         $this->db->where('l.override_default_status','Y');
     }
     if($order_type!=""){
         $this->db->order_by('schedule_date',$order_type);
         $this->db->limit(1,0);
    }
     $query  = $this->db->get();
     $result = $query->result_array();
        if ($this->db->_error_message())
            return FALSE;
        else
            return $result;
    }
    #---------------------------------------------------------------------------
    function unpaid_late_def_sum($schedule_date,$pid,$status){
        
     $this->db->select('sum(y.override_late_amount) as unpaid_late_sum,
        sum(y.override_default_amount) as unpaid_def_sum');
     $this->db->from('funds_payment_schedule y');
     $this->db->where('y.project_id',$pid);
     if($status=="L"){
         $this->db->where('y.override_late_amount !=',0);
         $this->db->where('y.override_late_status','Y');
     }elseif($status=="D"){
         $this->db->where('y.override_default_amount !=',0);
         $this->db->where('y.override_default_status','Y');
     }
     $query  = $this->db->get();
     $result = $query->row_array();
    
        if ($this->db->_error_message())
            return FALSE;
        else
            return $result;
    }
    #--------------------------------------------------------------------
    function unpaid_late_def_sum_loan($schedule_date,$pid,$status){
     $this->db->select('sum(l.override_late_amount) as unpaid_late_sum,
        sum(l.override_default_amount) as unpaid_def_sum');
     $this->db->from('funds_payment_loan l');
     $this->db->where('l.project_id',$pid);
     if($status=="L"){
         $this->db->where('l.override_late_amount !=',0);
         $this->db->where('l.override_late_status','Y');
     }elseif($status=="D"){
         $this->db->where('l.override_default_amount !=',0);
         $this->db->where('l.override_default_status','Y');
     }
     $query  = $this->db->get();
     $result = $query->row_array();
        if ($this->db->_error_message())
            return FALSE;
        else
            return $result;
    }
    function update_values($table=NULL,$arr_where=NULL,$arr_data=NULL)
    {
        $this->db->where($arr_where);
        $this->db->set($arr_data);
        $this->db->update($table);
        //echo $this->db->last_query();die;
        return true;
    }
    
 /*################################################ Project status Log ########################################################################*/

    function get_project_logs($project_id){
        $this->db->select('funds_projects.project_name,funds_project_status_log.*,funds_admin.admin_firstname,funds_admin.admin_lastname');
        $this->db->from('funds_project_status_log');
        $this->db->join('funds_projects','funds_project_status_log.project_id = funds_projects.project_id');
        $this->db->join('funds_admin','funds_admin.admin_id = funds_project_status_log.admin_id');
        $this->db->where('funds_project_status_log.project_id',$project_id);
        $res    = $this->db->get();
        $result =$res->result_array();
        return $result;
    }

    /*################################################ Project status Log ########################################################################*/

   /*################################################ Manual Transaction ########################################################################*/

    function funds_manual_transactions($type=NULL,$ach_status=NULL,$arr_where=NULL)
    {
        
        $this->db->select('*');
        $this->db->from('funds_manual_transactions');
        $this->db->where('IsDeleted','N');
        if($ach_status!=''){
            $this->db->where('manual_ach_status',$ach_status);
        }
        if($type!=''){
            $this->db->where('manual_type',$type);
        }
        if($arr_where!=''){ 
            $date = date('Y-m-d',strtotime($arr_where));
            $this->db->where('DATE(CreatedDate)',$date);
        }
        $res    = $this->db->get();
        $result =$res->result_array();
        return $result;
       
    }

     function get_manual_transactions($arr_where=NULL)
    {
        
        $this->db->select('*');
        $this->db->from('funds_manual_transactions');
        $this->db->where('IsDeleted','N'); 
        $this->db->where('isStoped','N');
        $this->db->where('manual_ach_status',0);
        if($arr_where!=''){ 
            $this->db->where($arr_where);
        }
        $res    = $this->db->get();
        $result =$res->result_array();
        return $result;
       
    }

  /*################################################ Manual Transaction ########################################################################*/
function get_stat($user_id,$pr_id,$cr_amnt,$cr_date)
    {
        
       // $this->db->where('funds_credit_account.credit_id ',$cr_id);
        $this->db->select('*');
        $this->db->from('funds_credit_account');
        $this->db->where('funds_credit_account.user_id ',$user_id);
        $this->db->where('funds_credit_account.project_id ',$pr_id);
        $this->db->where('funds_credit_account.credit_amount ',$cr_amnt);
        $this->db->where('DATE(funds_credit_account.credit_date)',$cr_date);
        $this->db->where('funds_credit_account.credit_status','C');
        $this->db->where('funds_credit_account.credit_type','');

        $query  = $this->db->get();
        $result = $query->row_array();
        
        if ($this->db->_error_message())
            return false;
        else
            return $result;
    }
    
    function auto_invest_reserved($project_id=NULL)
    {
        //$curr_date = date("Y-m-d");
        $this->db->select('sum(fund_auto_invest_email.payment_amount) as reserved_amount');
        $this->db->from('fund_auto_invest_email');
        $this->db->join('fund_auto_investment','fund_auto_investment.auto_id=fund_auto_invest_email.auto_id','left');
        $this->db->where('fund_auto_invest_email.project_id',$project_id);
        $this->db->where('fund_auto_investment.auto_status','A');
        $this->db->where('fund_auto_invest_email.auto_email_status','N');
        $this->db->where('fund_auto_invest_email.IsDeleted','N');
        //$this->db->where("fund_auto_invest_email.auto_email_date",$curr_date);
        $res = $this->db->get();
        $result =$res->result_array();
        
        if(!empty($result) && $result[0]['reserved_amount']!="")
            return $result[0]['reserved_amount'];
        else
            return 0;
    }
    function get_auto_investment_reserved_details($project_id=NULL){
        $this->db->select('sum(fund_auto_invest_email.payment_amount) as reserved_amount,DATE(auto_email_date) as auto_email_date');
        $this->db->from('fund_auto_invest_email');
        $this->db->join('fund_auto_investment','fund_auto_investment.auto_id=fund_auto_invest_email.auto_id','left');
        $this->db->where('fund_auto_invest_email.project_id',$project_id);
        $this->db->where('fund_auto_investment.auto_status','A');
        $this->db->where('fund_auto_invest_email.auto_email_status','N');
        $this->db->where('fund_auto_invest_email.IsDeleted','N');
        $res    = $this->db->get();
        $result = $res->row_array();
        if(!empty($result) && $result['reserved_amount']!="")
            return $result;
        else
            return 0;
    }

    function get_outsource_name(){
        $this->db->select('DISTINCT(servicing_outsourced_to) as servicing_outsourced_to ');
        $this->db->from('funds_projects');
        $this->db->where('project_servicing_outsourced','Y');
        $this->db->where('IsDeleted','N');
        $this->db->where('project_type !=','D');
        $this->db->where('servicing_outsourced_to is NOT NULL');
        $query  = $this->db->get();
        // echo $this->db->last_query();exit;
        $result = $query->result_array();
        if ($this->db->_error_message())
            return false;
        else
            return $result;
    }
         //notification to borrowers
    function send_borrower_email($from = "loanservicing@sharestates.com", $to, $subject, $body, $to_user = NULL, $attachment = NULL, $Bcc = NULL,$cc=NULL){
        
        $headers = 'From: Sharestates  <loanservicing@sharestates.com>' . "\n" . 'MIME-Version: 1.0' . "\n" . 'Content-type: text/html; charset=utf-8' . "\n";
        $headers .= 'Bcc: help@ssapp.support' . "\n";      
        if ($Bcc != '') {
            $headers .= 'Bcc: allen@sharestates.com' . "\n";
            //$headers .= 'Bcc: mkim@sharestates.com' . "\n";
            if(trim($subject) != 'Loan Maturity Date Approaching – Extend or Request a Payoff')
            {
                $headers .= 'Bcc: epradhan@sharestates.com' . "\n";
            }
            
            //$headers .= 'Bcc: mpapazahariou@sharestates.com' . "\n";
        }
        
        $headers .= 'X-Mailer: PHP/' . phpversion();
        $body = wordwrap($body, 70, "\n");
        return mail($to, $subject, $body, $headers);
    }

    function get_ach_bank_name($bank_id=NULL)
    {
        $this->db->select('*');
        $this->db->from('fund_bank');
        $this->db->where('(bank_name like "%wells%"  or bank_name like "%fargo%")');
        $this->db->where('bank_id',$bank_id);
        $query  = $this->db->get();
        // echo $this->db->last_query();exit;
        $result = $query->result_array();
        if ($this->db->_error_message())
            return false;
        else
            return $result;
    }

    #warehouse total
    function total_warehouse_share($arr_where){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('sum(number_shares) as warehouse_share,sum(whl_invest_amount) as warehouse_investment_total');
        $this->db->from('funds_whl_investors i');
        $this->db->join('funds_warehouse w','w.wh_id = i.wh_id');
       // $this->db->where('i.show_investment_project','N');
        // $this->db->where('w.show_investment','N');
        $this->db->where('i.IsDeleted','N');
        $result = $this->db->get();
        $res    = $result->row_array();
        if(!empty($res)){
            return $res;
        }else{
            return 0;
        }
        
    }
     #warehouse Account Credit
    function warehouse_account_credit($wh_id){
        $credit_amount = $this->warehouse_project_credit($wh_id);
        $debit_amount  = $this->warehouse_project_debit($wh_id);
        $c_amount = 0;
        $d_amount = 0;
        if (!empty($credit_amount)) {
            $c_amount = round(floor($credit_amount[0]['amt'] * 100) / 100, 2);
        }
        if (!empty($debit_amount)) {
            $d_amount = round(floor($debit_amount[0]['amt'] * 100) / 100, 2);
        }
        $cr_amount = ($c_amount - $d_amount);
        $balance   = round(floor($cr_amount * 100) / 100, 2);
        return $balance;
    }
    function warehouse_project_credit($wh_id,$date = NULL,$arr_where=NULL){

        //  $date = '2017-04-30';
        if ($date != '') {
            $this->db->where('c.wh_credit_date <= "' . $date . '"');
        }
        if($wh_id!=''){
            $this->db->where('w.wh_id',$wh_id);
        }
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('sum(c.wh_credit_amount) as amt');
        $this->db->from('funds_warehouse_account_credit c');
        $this->db->join('funds_warehouse w', 'w.wh_id = c.wh_id');
        // $this->db->join('funds_warehouse_distribution d','d.wh_distribution_id=c.wh_distribution_id');
        // $this->db->where('d.wh_dist_interest_type !=', 'D');
        $this->db->where('c.wh_credit_status', 'C');
        $query  = $this->db->get();
        $result = $query->result_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function warehouse_project_debit($wh_id,$date = NULL,$arr_where=NULL){

        //  $date = '2017-04-30';
        if ($date != '') {
            $this->db->where('c.wh_credit_date <= "' . $date . '"');
        }
        if($wh_id!=''){
            $this->db->where('w.wh_id',$wh_id);
        }
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('sum(c.wh_credit_amount) as amt');
        $this->db->from('funds_warehouse_account_credit c');
        $this->db->join('funds_warehouse w', 'w.wh_id = c.wh_id');
        $this->db->where('c.wh_credit_status', 'D');
        $query  = $this->db->get();
        $result = $query->result_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    #new investment
    function investor_or_not($uid,$arr_where=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('s.share_holder_id,y.investment_date');
        $this->db->from('funds_share_holders s');
        $this->db->join('funds_payments y','y.share_holder_id = s.share_holder_id');
        $this->db->join('funds_users u','s.user_id = u.user_id');
        $this->db->where('(u.user_id ="'.$uid.'"  or u.parent_user="'.$uid.'")');
        $this->db->where('y.payment_status != "D"');
        $this->db->where('s.IsDeleted','N');
        $query  = $this->db->get();
        $result = $query->result_array();
        return $result;
    }

    function get_construction_schedule_month($arr_where){
       
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('sum(c.construction_interest_amount) as amount');
        $this->db->from('funds_project_construction_loan_schedule c');
        $query  = $this->db->get();
        $result = $query->row_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function checkmail($from = "Greetings@sharestates.com", $to, $subject, $body, $to_user = NULL, $attachment = NULL, $Bcc = NULL,$cc=NULL){ 
        $headers = 'From: Sharestates  <Greetings@sharestates.com>' . "\n" . 'MIME-Version: 1.0' . "\n" . 'Content-type: text/html; charset=utf-8' . "\n";
        $headers .= 'X-Mailer: PHP/' . phpversion();
        $body = wordwrap($body, 70, "\n");
        return mail($to, $subject, $body, $headers);
    }
    function checkmail_attach($to, $subject, $body, $attachment = null)
    {
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->from('Greetings@sharestates.com', 'Sharestates');
        $this->email->to($to);
        $bccarray = array('help@ssapp.support');
        
        $this->email->bcc($bccarray);
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    function usbank_mail_attach($to, $subject, $body, $attachment = null, $bccarray = null)
    {
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->from('postclosing@sharestates.com', 'Sharestates');
        $this->email->to($to);
        if (isset($bccarray) && !empty($bccarray)) 
            $this->email->bcc($bccarray);
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
     function checkmail_attach_bcc($to, $subject, $body, $attachment = null,$bccarray=NULL)
    {
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->from('Greetings@sharestates.com', 'Sharestates');
        $this->email->to($to);
        if(!empty($bccarray)){
                $this->email->bcc($bccarray);
          // $bccarray = array('prasadcg@gmail.com', 'hari.maddali@gmail.com');  
        }
    
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    function checkmail_attach_bcc_post($to, $subject, $body, $attachment = null,$bccarray=NULL)
    {
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->from('postclosing@sharestates.com', 'Sharestates');
        //$this->email->from('hello@sharestates.com', 'Sharestates');
        $this->email->to($to);
        if(!empty($bccarray)){
                $this->email->bcc($bccarray);
          // $bccarray = array('prasadcg@gmail.com', 'hari.maddali@gmail.com');  
        }
    
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
     function checkmail_attach_bcc_cc($to, $subject, $body, $attachment = null,$bccarray=NULL,$ccarray=NULL)
    {
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->from('Greetings@sharestates.com', 'Sharestates');
        $this->email->to($to);
        if(!empty($bccarray)){
                $this->email->bcc($bccarray);
          // $bccarray = array('prasadcg@gmail.com', 'hari.maddali@gmail.com');  
        }
        if(!empty($ccarray)){
       
             $this->email->cc($ccarray);
            
         }
    
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    function checkmail_attach1($to, $subject, $body, $attachment = null,$bcc=null, $from = null, $reply_to = null)
    {
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        
        $this->email->to($to);
       // $bccarray = array('prasadcg@gmail.com', 'hari.maddali@gmail.com');
        
        if(!empty($from) && $from != null)
        {
            $this->email->from($from);
        }
        else
        {
            $this->email->from('Greetings@sharestates.com', 'Sharestates');
        }

        if(!empty($reply_to) && $reply_to != null)
        {
            $this->email->reply_to($reply_to);
        }

       // $this->email->bcc($bccarray);
        if(!empty($bcc)){
            $bccarray = array('help@ssapp.support');
            $this->email->bcc($bccarray);     
        }
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    function checkmail_attach1_proccessings($to, $subject, $body, $attachment = null,$bcc=null)
    {
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        $this->email->from('processing@sharestates.com', 'Sharestates');
        $this->email->to($to);
       // $bccarray = array('prasadcg@gmail.com', 'hari.maddali@gmail.com');
        
       // $this->email->bcc($bccarray);
        if(!empty($bcc)){
            $bccarray = array('help@ssapp.support');
            $this->email->bcc($bccarray);     
        }
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    #accured days
    function accrued_days($start,$end){
        $sdate      = strtotime($start);
        $stop_date  = $start;
        $edate      = strtotime($end);
        if($sdate <= $edate){
            $sum = 0;
            for($i = strtotime(($stop_date), strtotime($end)); $i < $edate; $i = strtotime('+1 day', $i)){
               $stop_day=date('d',$i);
               if($stop_day=='31'){
                continue;
               }
                $sum=$sum+1;
            }
            return $sum+1;
        }
    }

    function get_missing_payments_current($outsourced=NULL)
    {
        
        if($outsourced!=''){
            $this->db->where('project_servicing_outsourced','Y');
        }else{
            $this->db->where('project_servicing_outsourced','N');
        }
        $curdate = date('Y-m-d');
        $year_month =date('Ym');
        
        $this->db->select('funds_projects.project_id,funds_payment_schedule.schedule_id,funds_projects.project_name,funds_projects.developer_id,funds_payment_schedule.schedule_date, funds_payment_schedule.schedule_amount,funds_projects.project_dev_payment_due,funds_projects.project_dev_payment_charge_off,
            funds_projects.project_late_fee,funds_projects.project_default_interest,funds_projects.project_type,funds_projects.project_payoff_date');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_projects', 'funds_projects.project_id=funds_payment_schedule.project_id');
        $this->db->join('funds_developer_schedule', 'funds_developer_schedule.schedule_id=funds_payment_schedule.schedule_id','left');
        //$this->db->where('DATE(schedule_date) <=', $curdate);
        $this->db->where("EXTRACT(YEAR_MONTH FROM funds_payment_schedule.schedule_date) >=",$year_month);
        $this->db->where("( (funds_projects.project_payoff_date is NULL OR funds_projects.project_payoff_date ='0000-00-00')  OR(funds_projects.project_payoff_date is not null AND funds_projects.project_payoff_date <>'0000-00-00' AND DATE(funds_projects.project_payoff_date) >= '".$curdate."'))");
        $this->db->where('funds_projects.project_type <>', 'PC');
        $this->db->where('funds_projects.project_dev_payment_due', 'N');
        $this->db->where('funds_projects.project_dev_payment_charge_off', 'N');
        $this->db->where('(funds_payment_schedule.schedule_status = "A" and funds_developer_schedule.schedule_payment_success = "A")');
        $this->db->where('funds_projects.project_status', 'A');
        $this->db->where('funds_projects.IsDeleted','N');
        $this->db->where('funds_projects.project_type !=','D');
        $this->db->where('(funds_projects.project_construction_loan = funds_payment_schedule.costruction_draw_status)');
        $this->db->order_by('date(funds_payment_schedule.schedule_date)', 'ASC');
        $this->db->group_by('funds_payment_schedule.project_id');
         
        $result = $this->db->get();

        return $result->result_array(); 
    }

    function get_missing_loan_payments_current($outsourced=NULL)
    {
        if($outsourced!=''){
            $this->db->where('project_servicing_outsourced','Y');
        }else{
            $this->db->where('project_servicing_outsourced','N');
        }
        $curdate = date('Y-m-d');
        $year_month =date('Ym');


        $this->db->select('funds_projects.project_id,funds_payment_loan.loan_id,funds_projects.project_name,funds_projects.developer_id, funds_payment_loan.schedule_date, funds_payment_loan.schedule_amount,funds_projects.project_dev_payment_due,funds_projects.project_dev_payment_charge_off,
            funds_projects.project_late_fee,funds_projects.project_default_interest,funds_projects.project_type,funds_projects.project_payoff_date,project_extend_loan');
        $this->db->from('funds_payment_loan');
        $this->db->join('funds_developer_loan_schedule', 'funds_developer_loan_schedule.loan_id=funds_payment_loan.loan_id','left');
        $this->db->join('funds_projects', 'funds_projects.project_id=funds_payment_loan.project_id');
        //$this->db->where('DATE(schedule_date) <=', $curdate);
        $this->db->where("EXTRACT(YEAR_MONTH FROM funds_payment_loan.schedule_date) >=",$year_month);
        $this->db->where("( (funds_projects.project_payoff_date is NULL OR funds_projects.project_payoff_date ='0000-00-00')  OR(funds_projects.project_payoff_date is not null AND funds_projects.project_payoff_date <>'0000-00-00' AND DATE(funds_projects.project_payoff_date) >= '".$curdate."'))");
        $this->db->where('funds_projects.project_type <>', 'PC');
        $this->db->where('funds_projects.project_dev_payment_due', 'N');
        $this->db->where('funds_projects.project_dev_payment_charge_off', 'N');
        $this->db->where('(funds_payment_loan.schedule_status = "A" and funds_developer_loan_schedule.schedule_payment_success = "A")');
        $this->db->where('funds_projects.project_status', 'A');
        $this->db->where('funds_projects.project_extend_loan', 'Y');
        // $this->db->where('project_servicing_outsourced','N');
        $this->db->where('funds_projects.IsDeleted','N');
        $this->db->where('funds_projects.project_type !=','D');
        $this->db->order_by('date(funds_payment_loan.schedule_date)', 'ASC');
        $this->db->group_by('funds_payment_loan.project_id');
        $result1 = $this->db->get();//echo $this->db->last_query();exit; 
        $new_array = $this->get_missing_payments_project();
       
        foreach ($result1 as $key => $value) {
            # code...
            if(!in_array($value['project_id'], $new_array) ){

                $result['project_id'] = $value['project_id'];
                $result['loan_id'] = $value['loan_id'];
                $result['project_name'] = $value['project_name'];
                $result['developer_id'] = $value['developer_id'];
                $result['schedule_date'] = $value['schedule_date'];
                $result['schedule_amount'] = $value['schedule_amount'];
                $result['project_dev_payment_due'] = $value['project_dev_payment_due'];
                $result['project_dev_payment_charge_off'] = $value['project_dev_payment_charge_off'];
                $result['project_late_fee'] = $value['project_late_fee'];
                $result['project_default_interest'] = $value['project_default_interest'];
                $result['project_type'] = $value['project_type'];
                $result['project_payoff_date'] = $value['project_payoff_date'];
                $result['project_extend_loan'] = $value['project_extend_loan'];
            }

        }
        return $result1->result_array(); //$result;
        
    }
      //First time investment

     function get_first_time_investment($user_id)
    {
      
        $arr_result = $this->db->select('sum(funds_payments.amount_per_share * funds_share_holders.number_shares) as invest_amount')
                   ->where('(funds_users.user_id = "'.$user_id.'" or funds_users.parent_user = "'.$user_id.'")')
                   ->where('funds_payments.payment_status <> "D"')
                   ->join('funds_payments', 'funds_payments.share_holder_id = funds_share_holders.share_holder_id')
                   ->join('funds_users', 'funds_users.user_id = funds_payments.user_id')
                   ->get('funds_share_holders')
                   ->row_array(); //echo $this->db->last_query();exit;
        if (!empty($arr_result) && $arr_result['invest_amount'] > 0) {
            return $arr_result['invest_amount'];
        } else {
            return false;
        }
        
    }
    
    public function get_ln($project_id){
            
        $this->db->select('*');
        $this->db->from('funds_project_distributions');
        $this->db->join('funds_generate_distribution','funds_project_distributions.distribution_id = funds_generate_distribution.distribution_id');
        $this->db->where('funds_project_distributions.project_id',$project_id);
        $this->db->where('funds_project_distributions.distribution_return_status ','PR');
         $this->db->where('funds_generate_distribution.generate_payoff_status','N');
        
        $query = $this->db->get();
        $result = $query->result_array();
  // echo $this->db->last_query();exit;
        return $result;

        }
            #warehouse cashout
    function get_warehouse_cashout_details(){
        //$date = date('Y-m-d');
        $this->db->select('c.*,sum(b.bank_routing_num) as route_num,
            b.bank_routing_num,b.bank_acc_no,b.bank_nickname,b.bank_acc_type,b.wh_bank_id,
            ,w.wh_entity_name');
        $this->db->from(' funds_warehouse_distribution_cashout c');
        $this->db->join('funds_warehouse_bank b', 'b.wh_bank_id =  c.bank_name');
        $this->db->join('funds_warehouse w','w.wh_id = c.wh_id');
        $this->db->where('c.bank_name IS NOT NULL');
        $this->db->where('c.payment_ach_status', 0);
        $this->db->group_by('c.wh_cashout_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        // echo $this->db->last_query();exit;
        return $result;
    }
    function get_ach_bank_name_warehouse($bank_id=NULL)
    {
        $this->db->select('*');
        $this->db->from('funds_warehouse_bank');
        $this->db->where('(bank_name like "%wells%"  or bank_name like "%fargo%")');
        $this->db->where('wh_bank_id',$bank_id);
        $query  = $this->db->get();
        // echo $this->db->last_query();exit;
        $result = $query->result_array();
        if ($this->db->_error_message())
            return false;
        else
            return $result;
    }
    function withdraw_funds_all_warehouse(){
        $this->db->select('w.wh_entity_name,b.wh_bank_id, b.bank_name, b.bank_acc_no, b.bank_nickname,
         b.bank_routing_num, b.bank_acc_type,f.*');
        $this->db->from('funds_warehouse_withdraw_funds f');
        $this->db->join('funds_warehouse_bank b', 'b.wh_bank_id = f.withdraw_bank');
        $this->db->join('funds_warehouse w','w.wh_id = f.wh_id');
        $this->db->where('f.withdraw_ach_status', '0');
        $result = $this->db->get();
        //echo $this->db->last_query();die();
        return $result->result_array();
    }
    function warehouse_acc($wh_id){
        $credit_amount = $this->warehouse_project_credit($wh_id);
        $debit_amount  = $this->warehouse_project_debit($wh_id);
        $c_amount = 0;
        $d_amount = 0;
        if (!empty($credit_amount)) {
            $c_amount = round(floor($credit_amount[0]['amt'] * 100) / 100, 2);
        }
        if (!empty($debit_amount)) {
            $d_amount = round(floor($debit_amount[0]['amt'] * 100) / 100, 2);
        }
        $cr_amount = ($c_amount - $d_amount);
        return $cr_amount;
    }    

    function get_maturity_payment_schedule($pid){
        $this->db->select('max(schedule_date) as schedule_date');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_projects p','p.project_id =funds_payment_schedule.project_id'); //
        $this->db->where('funds_payment_schedule.project_id',$pid);
        $this->db->where('(p.project_construction_loan = funds_payment_schedule.costruction_draw_status)'); //
        $this->db->order_by('funds_payment_schedule.schedule_id','DESC');
        $result = $this->db->get();
        return $result->row_array();
  }
  function get_maturity_loan_payment_schedule($pid){
     $this->db->select('max(schedule_date) as schedule_date');
     $this->db->from('funds_payment_loan');
     $this->db->where('project_id',$pid);
     $this->db->order_by('loan_id','DESC');
     $result = $this->db->get();
     return $result->row_array();
  }
  #---------------------------------------------------------------------------------------
    function get_ach_reject_details($sh_id=NULL,$arr_where=NULL){
        $this->db->select('funds_ach_rejected.*');
        $this->db->from('funds_ach_rejected');
        $this->db->join('funds_developer_schedule','funds_developer_schedule.dev_schedule_id = funds_ach_rejected.rej_table_id');
        $this->db->where('funds_developer_schedule.dev_schedule_id',$sh_id);
        $this->db->where('funds_ach_rejected.rej_table_name','D');
        $this->db->order_by('funds_ach_rejected.rej_id','DESC');
        $result = $this->db->get();
        $res    = $result->result_array();
        if(!empty($res)){
            return $res;
        }else{
            return false;
        }
    }

    #---------------------------------------------------------------------
    function get_ach_reject_loan_details($sh_id=NULL,$arr_where=NULL){
        $this->db->select('funds_ach_rejected.*');
        $this->db->from('funds_ach_rejected');
        $this->db->join('funds_developer_loan_schedule','funds_developer_loan_schedule.dev_loan_id = funds_ach_rejected.rej_table_id');
        $this->db->where('funds_developer_loan_schedule.dev_loan_id',$sh_id);
        $this->db->where('funds_ach_rejected.rej_table_name','L');

        $this->db->order_by('funds_ach_rejected.rej_id','DESC');
        $result = $this->db->get();
        $res    = $result->result_array();
        if(!empty($res)){
            return $res;
        }else{
            return false;
        }
    }
    #ach manual transactions
    function manual_debit_transactions(){
        $date  = date('Y-m-d');
        $this->db->select('m.manual_id,m.payment_due,m.user_id,
            b.bank_routing_num,b.bank_acc_no,b.bank_nickname,b.bank_acc_type');
        $this->db->from('funds_ach_manual_transactions m');
        $this->db->join('fund_bank b', 'b.bank_id =  m.bank_id');
        $this->db->where('m.manual_type','D');
        $this->db->where('DATE(m.processing_date)',$date);
        $this->db->where('m.IsDeleted','N');
        $this->db->where('m.isStoped','N');
        $this->db->where('m.bank_id IS NOT NULL');
        $this->db->where('m.manual_ach_status', 0);
        $this->db->group_by('m.manual_id');
        $query  = $this->db->get();
        $result = $query->result_array();
            // echo $this->db->last_query();exit;
        return $result;
    }
    function manual_credit_transactions(){
        $date  = date('Y-m-d');
        $this->db->select('m.manual_id,m.payment_due,m.user_id,
            b.bank_routing_num,b.bank_acc_no,b.bank_nickname,b.bank_acc_type');
        $this->db->from('funds_ach_manual_transactions m');
        $this->db->join('fund_bank b', 'b.bank_id =  m.bank_id');
        $this->db->where('m.manual_type','C');
        // $this->db->where('DATE(m.processing_date)',$date);
        $this->db->where('m.IsDeleted','N');
        $this->db->where('m.isStoped','N');
        $this->db->where('m.bank_id IS NOT NULL');
        $this->db->where('m.manual_ach_status', 0);
        $this->db->group_by('m.manual_id');
        $query  = $this->db->get();
        $result = $query->result_array();
            // echo $this->db->last_query();exit;
        return $result;
    }
    function compare_gross_rate($rate,$pid=NULL){
        $pdetails = $this->common->get_row('funds_projects','fee_anual_return',array('project_id'=>$pid));
        $userrate = str_replace(array(',','%','$'),'', $rate);
        $gross_rate =str_replace(array(',','%','$'),'', $pdetails['fee_anual_return']);
        if($gross_rate!=""){
            $userrate = ($gross_rate < $userrate) ? $gross_rate :$userrate;
        }
        return $userrate;
    }

    //check sch

    function get_all_pastdues_sch($schedule_date,$project_id) //test
  {
        //$current_date = date('Y-m-d');
        $this->db->select('funds_payment_schedule.schedule_id,funds_payment_schedule.schedule_date,funds_payment_schedule.schedule_status,d.schedule_payment_success');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_developer_schedule d','d.schedule_id = funds_payment_schedule.schedule_id','left');
        $this->db->join('funds_projects p','p.project_id = funds_payment_schedule.project_id');
        
        $this->db->where('DATE(funds_payment_schedule.schedule_date)',$schedule_date);
        $this->db->where('(funds_payment_schedule.schedule_status ="C" OR d.schedule_payment_success = "I")');
        $this->db->where('funds_payment_schedule.project_id',$project_id);
        $this->db->group_by('funds_payment_schedule.schedule_id');
        $res    = $this->db->get();
        $result =$res->row_array();
       // print_r($result);exit;
       // $new_date = array();
         if(!empty($result)){
            
            return $result;
         }else{
             return false;
         }
  }
  function get_all_pastdues_loansch($schedule_date,$project_id) //test
  {
        //$current_date = date('Y-m-d');
           

        $this->db->select('funds_payment_loan.loan_id,funds_payment_loan.schedule_date,funds_payment_loan.schedule_status,d.schedule_payment_success');
        $this->db->from('funds_payment_loan');
        $this->db->join('funds_developer_loan_schedule d','d.loan_id = funds_payment_loan.loan_id','left');
        $this->db->join('funds_projects p','p.project_id = funds_payment_loan.project_id');
       
        $this->db->where('DATE(schedule_date)',$schedule_date);
        $this->db->where('(funds_payment_loan.schedule_status ="C" OR d.schedule_payment_success = "I")');
        $this->db->where('funds_payment_loan.project_id',$project_id);
        $this->db->group_by('funds_payment_loan.loan_id');
        $res    = $this->db->get();
        $result =$res->row_array();
       // print_r($result);exit;
       // $new_date = array();
         if(!empty($result)){
            
            return $result;
         }else{
             return false;
         }
  }
    function project_escrow_remaining($project_id){
        $project_info               = $this->get_row('funds_projects','project_id,project_holdback_amount,project_holdback_status',array('project_id'=>$project_id));
        $result['escrow_balance']   = 0;
        
        if(!empty($project_info) && $project_info['project_holdback_status']=='Y'){
            $escrow_total               = $this->escrew_details($project_id);
            $result['escrow_balance']   = $project_info['project_holdback_amount']-$escrow_total['total_escrew_amount'];
        }
        return $result;
    }
    function escrew_details($project_id){
        $this->db->select("h.*,SUM(h.escrew_loan_amount) AS total_escrew_amount");
        $this->db->from("funds_project_escrow_hold_back h");
        $this->db->where('h.project_id',$project_id);
        $query = $this->db->get();
        $result = $query->row_array();
        // echo $this->db->last_query();exit;
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }

    }
    function get_manual_account_fund($user_id=NULL,$arr_search=NULL){
        if(!empty($arr_search)){
            if($arr_search['user_id']!= ''){
                $where  = array('ac.user_id'=>$arr_search['user_id']);
                $this->db-> where($where);
            }else{
                $this->db->where("(ac.user_id = '".$user_id."' or u.parent_user = '".$user_id."')");
            }

            if($arr_search['year']!= ''){
                if($arr_search['year']== 'year_date'){
                    $this->db->where('YEAR(ac.credit_date)',date('Y'));
                }elseif($arr_search['year']== '1year'){
                    $curr_date=date("Y-m-d");
                    $oneYearOn = date('Y-m-d',strtotime(date("Y-m-d", mktime()) . " - 365 day"));
                    $this->db->where('DATE(ac.credit_date) >=',$oneYearOn);
                    $this->db->where('DATE(ac.credit_date) <=',$curr_date);
                }
            }

        }else{
            $this->db->where("(ac.user_id = '".$user_id."' or u.parent_user = '".$user_id."')");
        }
        $this->db->select(array('ac.*,DATE(ac.credit_date) as date,a.admin_firstname,a.admin_lastname,
            u.first_name,u.last_name,u.parent_user,u.sub_user_type,
            u.sub_jacc_first_name,u.sub_jacc_last_name'));
        $this->db->from('funds_credit_account ac');
        $this->db->join('funds_users u','u.user_id = ac.user_id');
        $this->db->join('funds_admin a','a.admin_id = ac.admin_id');
        $this->db->where('(ac.project_id="0" and ac.admin_id!="0" and ac.admin_id is not null and ac.credit_edit="A" and credit_status!="DEL")');
        $result = $this->db->get();
        // echo $this->db->last_query();exit;
        return $result->result_array();
    }
    function get_pending_sch($project_id){
        $this->db->select('y.schedule_id');
        $this->db->from('funds_payment_schedule y');
        $this->db->join('funds_developer_schedule d','y.schedule_id = d.schedule_id','left');
        $this->db->join('funds_projects p','p.project_id = y.project_id');
        $this->db->where('p.project_construction_loan = y.costruction_draw_status');
        $this->db->where('(y.schedule_status ="C" OR (y.schedule_status="A" and d.schedule_payment_success = "I") )');
        $this->db->where("( (p.project_payoff_date !='' AND p.project_payoff_date !='0000-00-00' AND DATE(p.project_payoff_date) >= DATE(y.schedule_date) )OR (p.project_payoff_date='' OR p.project_payoff_date IS NULL OR p.project_payoff_date='0000-00-00' OR p.project_payoff_date='0000-00-00 00:00:00') )");
        $this->db->where('y.project_id',$project_id);
        $this->db->limit(1,0);
        $result = $this->db->get();
        return $result->result_array();

    }
    function get_pending_sch_loan($project_id){
        $this->db->select('y.loan_id');
        $this->db->from('funds_payment_loan y');
        $this->db->join('funds_developer_loan_schedule d','y.loan_id = d.loan_id','left');
        $this->db->join('funds_projects p','p.project_id = y.project_id');
        $this->db->where('(y.schedule_status ="C" OR (y.schedule_status="A" and d.schedule_payment_success = "I") )');
        $this->db->where("( (p.project_payoff_date !='' AND p.project_payoff_date !='0000-00-00' AND DATE(p.project_payoff_date) >= DATE(y.schedule_date) )OR (p.project_payoff_date='' OR p.project_payoff_date IS NULL OR p.project_payoff_date='0000-00-00' OR p.project_payoff_date='0000-00-00 00:00:00') )");
        $this->db->where('y.project_id',$project_id);
        $this->db->limit(1,0);
        $result = $this->db->get();
        return $result->result_array();

    }

    function user_encrypt_ssn($user_id,$field,$value = NULL){

        $security_number = $this->get_row('funds_users',$field,array('user_id'=>$user_id));
        $ssn_hid = "";
        $key = $this->encrypt_ssn->set_encryption_key($user_id);

        if($value=='' && $security_number[$field]!=''){
          $ssn_hid = $this->encrypt_ssn->encrypt($security_number[$field],$key);
        }else if($security_number[$field] == $value) {
          $ssn_hid = $security_number[$field];
        }else {
          $ssn_hid = $this->encrypt_ssn->encrypt($value,$key);
        }

        $arr_data  = array($field => $ssn_hid);
        $this->db->where('user_id', $user_id);
        $this->db->update('funds_users', $arr_data);
    }

    function developer_encrypt_ein($developer_id,$table,$value = NULL){
        $security_number = $this->get_row($table,'developer_ein',array('developer_id'=>$developer_id));
        $ssn_hid = "";
        $key = $this->encrypt_ssn->set_encryption_key($developer_id);

        if($value=='' && $security_number['developer_ein']!=''){
          $ssn_hid = $this->encrypt_ssn->encrypt($security_number['developer_ein'],$key);
        }else if($security_number['developer_ein'] == $value) {
          $ssn_hid = $security_number['developer_ein'];
        }else {
          $ssn_hid = $this->encrypt_ssn->encrypt($value,$key);
        }

        $arr_data  = array('developer_ein' => $ssn_hid);
        $this->db->where('developer_id', $developer_id);
        $this->db->update($table, $arr_data);
    }

    function other_encrypt_ssn($table,$table_id,$value_id,$update_field,$value = NULL){
        $security_number = $this->get_row($table,$update_field,array($table_id=>$value_id));
        $ssn_hid = "";
        $key = $this->encrypt_ssn->set_encryption_key($value_id);

        if($value=='' && $security_number[$update_field]!=''){
          $ssn_hid = $this->encrypt_ssn->encrypt($security_number[$update_field],$key);
        }else if($security_number[$update_field] == $value) {
          $ssn_hid = $security_number[$update_field];
        }else {
          $ssn_hid = $this->encrypt_ssn->encrypt($value,$key);
        }

        $arr_data  = array($update_field => $ssn_hid);
        $this->db->where($table_id, $value_id);
        $this->db->update($table, $arr_data);
    }
    function get_178($pid,$share_holder_id){
        $this->db->select('sum(d.distribution_amount) as SumPrinc');
        $this->db->from('funds_project_distributions d');
        $this->db->where('d.distribution_return_status','PR');
        $this->db->where('d.project_id',$pid);
        $this->db->where('d.share_holder_id',$share_holder_id);
        $res=$this->db->get();
        $result =$res->row_array();
        return $result['SumPrinc'];


    }
     #partial principal
    function partial_princi_details($shars,$schedule_date,$project_id,$fee_total_update,$inv_amt=NULL){    
        
        $project_details   = $this->get_row('funds_projects','project_payoff_date,project_close_date,loan_sale_date,loan_sale_status',array('project_id'=>$project_id));
        $share_holder_info = $this->share_payment_row($shars);
        
        $pp_result         = array();
        $pp_result_main    = array();
        $pp_where          = array();
        $pp_search         = array();
        $arr               = array();
        
        $sale_perdiem_interest   = 'N';
        $perdiem_intr='N';
        if($project_details['loan_sale_status']=='Y' && $project_details['loan_sale_date'] != '' &&  $project_details['loan_sale_date'] != '0000-00-00' && date('Ym',strtotime($project_details['loan_sale_date'].'+1 month')) == date('Ym',strtotime($schedule_date)) && $share_holder_info['sale_status']=='I'){
            $sales_generate_interest_payoff = 'Y';
            $schedule_id                    = 0;
            $sale_perdiem_interest   = 'Y';
            $perdiem_intr='Y';
            $date   = $project_details['loan_sale_date'];
        }else{
            $sales_generate_interest_payoff = 'N';
            $sale_perdiem_interest   = 'N';
            $schedule_date_day       =  date('d',strtotime($schedule_date));
            $schedule_date_month     =  date('m',strtotime($schedule_date));
            if($schedule_date_day=='30' || $schedule_date_day=='31' || ($schedule_date_month=='02' && ($schedule_date_day=='28' || $schedule_date_day=='29'))){
               $schedule_date        = date('Y-m-d',strtotime($date.'first day of next month'));
            }
            $date = $schedule_date;
        }  
        
        $dev_payment_date1 =date('Y-m-d',strtotime($date));
        
        $dev_payment_date1_Ym    = date('Ym',strtotime($dev_payment_date1));
        $dev_payment_date        = date('Y-m-d',strtotime($dev_payment_date1.'previous month'));
        $dev_payment_date_Ym     = date('Ym',strtotime($dev_payment_date));
        $dev_payment_date_Ym_str = strtotime($dev_payment_date_Ym);
        
        #project close date
        $project_close_date    = "";
        if($project_details['project_close_date']!="" && $project_details['project_close_date']!="0000-00-00"){
            $project_close_date    = $project_details['project_close_date'];
        }
        #sale date
        $loan_sale_date     = date('Y-m-d',strtotime($project_details['loan_sale_date']));
        $loan_sale_date_Ym  = date('Ym',strtotime($loan_sale_date));    
        $loan_sale_date_str = strtotime($loan_sale_date);
        $sale_day           = date('d',strtotime($loan_sale_date));  
        #payoff date
        $payoff_date       = "";
        if($project_details['project_payoff_date']!=""  &&  $project_details['project_payoff_date'] != '0000-00-00'){
            $payoff_date       = date('Y-m-d',strtotime($project_details['project_payoff_date']));
            $project_payoff_Ym = date('Ym',strtotime($payoff_date));
            $project_payoff_str=  strtotime($project_payoff_date);
            $payoff_day        = date('d',strtotime($payoff_date));
        }
        #fundclear date
        if($loan_sale_date!="0000-00-00" && $project_details['sale_status']=="N" ){ 

            if(strtotime($share_holder_info['payement_fund_clear_date'])<strtotime($loan_sale_date)){
              $investor_date      = date('Y-m-d',strtotime($project_details['loan_sale_date']));
            }else{
              $investor_date      = date('Y-m-d',strtotime($share_holder_info['payement_fund_clear_date']));
            }
        }elseif((($share_holder_info['payement_fund_clear_date'])!="") && ($share_holder_info['payement_fund_clear_date']!="0000-00-00")){
              $investor_date      = date('Y-m-d',strtotime($share_holder_info['payement_fund_clear_date']));
             
        }
        #compare fundclear date with close date
        $fund_start_date   = $investor_date;
        if($investor_date < $project_close_date){
            $fund_start_date = $project_close_date;
        }
        $fund_start_date_str = strtotime($fund_start_date);
        $fund_start_date_Ym  = date('Ym',strtotime($fund_start_date));
        $fund_start_date_day = date('d',strtotime($fund_start_date));
        $start_perdiem ='N';
        if(date('Ym',strtotime($fund_start_date.'+1 month'))==$dev_payment_date1_Ym){
            $start_perdiem ='Y';
        }

        

        #payoff interest 
        $perdiem_payoff_interest1 = 'N';
        if($payoff_date!="" && $payoff_date == date('Y-m-d',strtotime($schedule_date)) ){
         $perdiem_payoff_interest1 = 'Y';
         
        }
        $generate_interest_payoff = 'N';
        if($perdiem_payoff_interest1=='Y'){
            $schedule_id              = 0;
            $generate_interest_payoff = 'Y';
        }
        #sale  interest
        // $sale_perdiem_interest   = 'N';
        // if(date('Ym',strtotime($loan_sale_date_Ym.'+1 month')) == $dev_payment_date1_Ym){
        //   $sale_perdiem_interest = 'Y';   
        //   $perdiem_intr='Y';
        // }

        #payoff interest
        $perdiem_payoff_interest = 'N';
        if($payoff_date!= '' && $payoff_date==$dev_payment_date1 ){
           $perdiem_payoff_interest = 'Y';
           $perdiem_intr='Y';
        }


        $days_array        = $this->perdiem_days($project_details,$share_holder_info,array('schedule_date'=>$schedule_date),$sales_generate_interest_payoff,$generate_interest_payoff);
        $perdiem_days      = $days_array['perdiem_days'];
        $no_days_remaining = $days_array['number_days'];
                
        $partial_principal_data =$partial_principal_datamain = $this->get_partial_princi_data($shars,$dev_payment_date1_Ym,'partial_princiapal_added_on','ASC');
        if($perdiem_intr=='Y'){
            $partial_principal_data = $this->get_partial_princi_data($shars,$dev_payment_date1_Ym,'partial_princiapal_added_on','ASC',$pp_where,$pp_search,'Y');                                    
        }
        
        
        $current_balance        = $this->check_principal_balance($shars);
        $pp_dist_sum =0;
       
        if(!empty($partial_principal_data)){ 

            if($no_days_remaining!=0){
                $get_prev_princ = $this->get_partial_princi_data($shars,$dev_payment_date_Ym);
                if($perdiem_intr=='Y'){
                    $get_prev_princ = $this->get_partial_princi_data($shars,$dev_payment_date1_Ym);
                }
               
                if(empty($get_prev_princ)){
                    $main_investment     = $share_holder_info['number_shares'] * $share_holder_info['amount_per_share'];

                    if($inv_amt!=""){
                        $main_investment =$inv_amt;
                    }
                }else{
                    $main_investment = $get_prev_princ[0]['principal_balance'];
                }
                if($perdiem_intr=='Y'){
                    $month_princ_exist = $this->get_partial_princi_indv($shars,$dev_payment_date1_Ym,'partial_princiapal_added_on','ASC');
                }else{
                    $month_princ_exist = $this->get_partial_princi_indv($shars,$dev_payment_date_Ym,'partial_princiapal_added_on','ASC'); 
                }
                $k=0;
                $pp=1;
                $mpp=1;
                foreach($partial_principal_data as $key_pp => $pp_value) {
                    $current_investment  = $pp_value['principal_balance'];
                    $pp_updated_date     = date('Y-m-d',strtotime($pp_value['partial_princiapal_added_on']));
                    $pp_updated_date_str = strtotime($pp_updated_date);
                    $pp_updated_day      = date('d',strtotime($pp_updated_date));
                    $pp_updated_Ym       = date('Ym',strtotime($pp_updated_date));
                    $main_pp_dist="";
                    $main_pp_investment="";

                    if(($pp_updated_Ym==$dev_payment_date_Ym)|| ($pp_updated_Ym==$dev_payment_date1_Ym && $perdiem_intr=='Y')){
                        $nextdate             = $partial_principal_data[$key_pp+1]['partial_princiapal_added_on'];
                        if($nextdate!=""){
                            $pp_updated_date_next     = date('Y-m-d',strtotime($nextdate));
                            $pp_updated_date_next_str =strtotime($pp_updated_date_next);
                            $pp_updated_day_next      = date('d',strtotime($pp_updated_date_next));
                        }
                        if($no_days_remaining<30 || ($perdiem_intr=='Y')){
                            $ppdays = 0;
                            // compare with fundclear date
                            if($project_payoff_Ym==$pp_updated_Ym){ //compare with payoff date
                                $ppdays = 0;
                                $org_days=0;
                                if($fund_start_date_str <= $pp_updated_date_str && $fund_start_date_Ym==$pp_updated_Ym){
                                    $org_days=($pp_updated_day-$fund_start_date_day)+1;
                                }elseif($fund_start_date_str <= $pp_updated_date_str && $fund_start_date_Ym<$pp_updated_Ym){
                                    $org_days=$pp_updated_day;
                                }
                                if($project_payoff_str > $pp_updated_date_str){
                                    $ppdays     =  ($payoff_day-$pp_updated_day)+1;
                                    if($nextdate!="" && $pp_updated_date_next_str <= $project_payoff_str){
                                        $ppdays = ($pp_updated_day_next-$pp_updated_day);
                                        if($pp_updated_day_next == $pp_updated_day){ //day = next day
                                          $ppdays=1;
                                        }
                                    }  
                                
                                }
                                // echo $ppdays.'/'.$org_days;
                            }else if($loan_sale_date_Ym==$pp_updated_Ym){
                                $org_days=0;
                                $ppdays =0;
                                if($fund_start_date_str <= $pp_updated_date_str && $fund_start_date_Ym==$pp_updated_Ym){
                                    $org_days=($pp_updated_day-$fund_start_date_day);
                                    if($nextdate!=""){
                                        $ppdays = ($pp_updated_day_next-$pp_updated_day);//
                                        if($pp_updated_day_next == $pp_updated_day){ //day = next day
                                          $ppdays=1;
                                        }   
                                    }else{
                                        $ppdays = 30-$pp_updated_day;
                                    }
                                }elseif($fund_start_date_str <= $pp_updated_date_str && $fund_start_date_Ym<$pp_updated_Ym){
                                    $org_days = $pp_updated_day;
                                }
                                // sales perdiem
                                if($sale_perdiem_interest=='Y'){
                                    if($loan_sale_date_str < $pp_updated_date_str){
                                      $ppdays = 0;
                                    }elseif($loan_sale_date_str >= $pp_updated_date_str){                                        
                                       $ppdays = ($sale_day-$pp_updated_day);
                                      if($nextdate!="" && $pp_updated_date_next_str <= $loan_sale_date_str){
                                        $ppdays = $pp_updated_day_next-$pp_updated_day;
                                        if($pp_updated_day_next == $pp_updated_day){ //day = next day
                                            $ppdays=1;
                                        }                                          
                                      }                                      
                                    }                                
                                }

                            }elseif($fund_start_date_Ym==$pp_updated_Ym){

                                $ppdays = 0;
                                if($fund_start_date_str <= $pp_updated_date_str){
                                    $org_days = ($pp_updated_day-$fund_start_date_day)+1;
                                    if($nextdate!=""){
                                        $ppdays = ($pp_updated_day_next-$pp_updated_day);//
                                        if($pp_updated_day_next == $pp_updated_day){ //day = next day
                                          $ppdays=1;
                                        }   
                                    }else{
                                     $ppdays = 30-$pp_updated_day;
                                    }
                                }
                            } 

                        }else{
                            $ppdays      = 30-$pp_updated_day;
                            if($nextdate!=""){
                                $ppdays = $pp_updated_day_next-$pp_updated_day;
                                if($pp_updated_day_next == $pp_updated_day){ 
                                    $ppdays=1;
                                }
                            }
                            $org_days    = $pp_updated_day;
                        }

                        $main_pp_res    =($current_investment*$fee_total_update/100);
                        $calc_pp_amount =$part_dist_amt= ($main_pp_res/360)*$ppdays;


                        $pp_dist_sum    = $pp_dist_sum+$calc_pp_amount;

                        if($k==0){
                            $main_pp_res =($main_investment*$fee_total_update/100);
                            $main_pp_cal = $main_pp_dist =($main_pp_res/360)*$org_days;
                            $pp_dist_sum =$pp_dist_sum+$main_pp_cal;
                            $main_pp_investment = $main_investment;
                        }
                        $k++;

                    }elseif($pp_updated_Ym<$dev_payment_date_Ym && empty($month_princ_exist)){
                        $main_pp_res =($current_investment*$fee_total_update/100);
                        $pp_dist_sum =$part_dist_amt= ($main_pp_res/360)*$no_days_remaining;
                    }
                }
                $total_invest = $investor_amount =$current_investment;
            }        
            $arr['pp_dist_sum']  = $pp_dist_sum;
            $arr['total_invest'] = $total_invest;  
        }elseif(!empty($partial_principal_datamain)){
            $total_invest = $investor_amount =$share_holder_info['current_invest_amount'];        
            $distamnt     = ($total_invest*$fee_total_update/100);
            $pp_dist_sum  = ($distamnt/360)*$no_days_remaining;
            $arr['pp_dist_sum']  = $pp_dist_sum;
            $arr['total_invest'] = $total_invest;  
        }
        return $arr;                    
    }
    function perdiem_days($project_details,$share_holder_info,$schedule_details,$sales_generate_interest_payoff,$generate_interest_payoff){
    
    //closing date
      $closing_date    = $project_details['project_close_date'];
      if($closing_date!='' && $closing_date!='0000-00-00'){
        $closing_date   = date('Y-m-d',strtotime($closing_date));
        $closing_month  = date('Ym',strtotime($closing_date));
        $closing_day    = date('d',strtotime($closing_date));
      }else{
        $closing_date   = '';
      }
        
        //schedule date
      $selected_date   = $schedule_details['schedule_date'];
      $selected_date   = date('Y-m-d',strtotime($selected_date));
      $select_day      = date('d',strtotime($selected_date));
      $selected_date_new   = date('Y-m-d',strtotime($selected_date.'-1 month'));
      $selected_month  = date('m',strtotime($selected_date_new));
      $selected_year  = date('Y',strtotime($selected_date_new));
      $no_daysin_selected = cal_days_in_month(CAL_GREGORIAN, $selected_month, $selected_year);
      if($no_daysin_selected=='31'){
        $no_daysin_selected = 30;
      }

      $schedule_date   = $schedule_details['schedule_date'];
      if($schedule_date!='' && $schedule_date!='0000-00-00'){
        $schedule_date   = date('Y-m-d',strtotime($schedule_date.'-1 month'));
        $schedule_date   = date('Y-m-d',strtotime($schedule_date));
        $schedule_month  = date('Ym',strtotime($schedule_date));
        $schedule_day    = date('d',strtotime($schedule_date));
      }else{
        $schedule_date   = '';
      }
        
        //fund clear date 
      $fund_clear_date = $share_holder_info['payement_fund_clear_date'];
      if($fund_clear_date!='' && $fund_clear_date!='0000-00-00'){
        $fund_clear_date   = date('Y-m-d',strtotime($fund_clear_date));
        $fund_clear_month  = date('Ym',strtotime($fund_clear_date));
        $fund_clear_day    = date('d',strtotime($fund_clear_date));
      }else{
        $fund_clear_date   = '';
      }
        
        //loan sale date
      $loan_sale_date  = $project_details['loan_sale_date'];
      if($loan_sale_date!='' && $loan_sale_date!='0000-00-00'){
        $loan_sale_date   = date('Y-m-d',strtotime($loan_sale_date));
        $loan_sale_month  = date('Ym',strtotime($loan_sale_date));
        $loan_sale_day    = date('d',strtotime($loan_sale_date));
      }else{
        $loan_sale_date   = '';
      }
        
        //payoff date
      $payoff_date    = $project_details['project_payoff_date'];
      if($payoff_date!='' && $payoff_date!='0000-00-00'){
        $payoff_date   = date('Y-m-d',strtotime($payoff_date));
        $payoff_month  = date('Ym',strtotime($payoff_date));
        $payoff_day    = date('d',strtotime($payoff_date));
      }else{
        $payoff_date   = '';
      }
        $new_date     = $closing_date;
        if($closing_date!=""){
          if($closing_date < $fund_clear_date){
            $new_date       = $fund_clear_date;
          }
        }else{
          $new_date       = $fund_clear_date;
        }
        if($new_date!=""){
          $new_date_day   = date('d',strtotime($new_date));
          $new_date_month = date('Ym',strtotime($new_date));
          $new_date_str   = strtotime($new_date);
        }
      $perdiem_days = 30;
      $no_of_days   = 30;
        $new_perdiem_status = 'N';
        $close_perdiem_status = 'N';

        if( $fund_clear_date=='' ||  ($fund_clear_date!='' && ($fund_clear_date > $schedule_date) )  ){
          $no_of_days   = 0;
        }

        /* perdiem days */
      // compare with closing date 
      if( $closing_date!='' && ($closing_month == $schedule_month) ){
        $perdiem_days = (30 - date('d',strtotime($closing_date))) + 1;
      }
      // compare with payoff date
      if( $payoff_date!='' && ($payoff_month == $schedule_month) ){
        $perdiem_days = date('d',strtotime($payoff_date));
      }
      // compare with loan sale date
      if( $loan_sale_date!='' && ($loan_sale_month == $schedule_month) ){
        $perdiem_days = date('d',strtotime($loan_sale_date));
      }
      /* perdiem days */

      /* no of days */
      // compare with fund clear date + schedule date
      if( $fund_clear_date!='' && ($fund_clear_month == $schedule_month) ){
        $no_of_days = (30 - date('d',strtotime($fund_clear_date))) + 1;
        // compare with fund clear date + closing date
        if($closing_date!='' && ($closing_month == $schedule_month) ){
          if($fund_clear_date > $closing_date){
            $no_of_days = (30 - date('d',strtotime($fund_clear_date))) + 1;
            $fund_clear_day =  date('d',strtotime($fund_clear_date));
          }else{
            $no_of_days = (30 - date('d',strtotime($closing_date))) + 1;
            $fund_clear_day =  date('d',strtotime($closing_date));
          }
        }
        // compare with fund clear date + payoff date
        if($payoff_date!='' && ($payoff_month == $schedule_month) ){
                if($payoff_date > $fund_clear_date){
            $no_of_days = (date('d',strtotime($payoff_date)) - date('d',strtotime($fund_clear_date))) + 1;
          }else{
            $no_of_days = 0;
          }
        }
        // compare with loan sale date + payoff date
        if($loan_sale_date!='' && ($loan_sale_month == $schedule_month) ){
                if($loan_sale_date > $fund_clear_date){
            $no_of_days = (date('d',strtotime($loan_sale_date)) - date('d',strtotime($fund_clear_date))) + 1;
          }else{
            $no_of_days = 0;
          }
        }
        $new_perdiem_status = 'Y';
      }
      // compare with payoff date + schedule date
      if( $payoff_date!='' && ($payoff_date == $selected_date) ){
            $no_of_days   = date('d',strtotime($payoff_date));
            $perdiem_days = date('d',strtotime($payoff_date));
            // compare with payoff date + closing date
        if($closing_date!='' && ($payoff_month == $closing_month) ){
                if($payoff_date > $closing_date){
                  if($fund_clear_date > $closing_date){
              $no_of_days   = (date('d',strtotime($payoff_date)) - date('d',strtotime($fund_clear_date))) + 1;
                  }else{
                    $no_of_days   = (date('d',strtotime($payoff_date)) - date('d',strtotime($closing_date))) + 1;
                  }
            $perdiem_days = (date('d',strtotime($payoff_date)) - date('d',strtotime($closing_date))) + 1;
          }else{
            $no_of_days   = 0;
            $perdiem_days = 0;
          }
        }

      }
      // compare with loan sale date + schedule date
        if( $loan_sale_date!='' && ($loan_sale_month == $schedule_month) ){
          if($sales_generate_interest_payoff=='Y'){ //sales perdiem payoff
            if($loan_sale_month > $new_date_month){
              $no_of_days = date('d',strtotime($loan_sale_date));
            }elseif($loan_sale_month==$new_date_month){
                if($loan_sale_date > $new_date){
                  $no_of_days = ($loan_sale_day -$new_date_day) + 1;
                }
                
            }else{
              $no_of_days =0;
            }
           
          }else{  

            $perdiem_days = 30;
            if($new_date > $loan_sale_date && $loan_sale_month == $new_date_month){  
                $no_of_days = ($perdiem_days -$new_date_day) + 1;
            }elseif($new_date < $loan_sale_date && $loan_sale_month == $new_date_month){  
                $no_of_days = ($perdiem_days -$loan_sale_day)+1;
            }elseif($new_date < $loan_sale_date && $loan_sale_month > $new_date_month){  
                $no_of_days = ($perdiem_days -$loan_sale_day)+1;
            }else{
              $no_of_days =0;
               
            }
          }
          // compare with loan sale date + closing date
          
        }

      /* no of days */
        if($sales_generate_interest_payoff=='Y'){
        $note= 'Final interest payment for per diem interest covering '.date("M 01, Y",strtotime($loan_sale_date)).' through '.date("M ".$loan_sale_day.", Y",strtotime($loan_sale_date)).' - Project Complete.';
        }else if($generate_interest_payoff=='Y'){
          $note= 'Final interest payment for per diem interest covering '.date("M 01, Y",strtotime($payoff_date)).' through '.date("M ".$loan_sale_day.", Y",strtotime($payoff_date)).' - Project Complete.';
        }else{
          if($new_perdiem_status=='Y'){
            $schedule_day = $fund_clear_day;
          }
          if($select_day==30 || $select_day==31){
          $selected_date = date('Y-m-01',strtotime($selected_date.'+1 month'));
        }
        if($schedule_day==30 || $schedule_day==31){
          $schedule_date = date('Y-m-01',strtotime($schedule_date.'+1 month'));
              $schedule_day='01';
          }
        $note=date("M 01, Y",strtotime($selected_date))." Payment covering ".date("M ".$schedule_day.", Y",strtotime($schedule_date))." through ".date("M ".$no_daysin_selected.", Y",strtotime($schedule_date)); //'Auto Distribution '.
      }

      $arr_result['perdiem_days'] = $perdiem_days;
      $arr_result['number_days']  = $no_of_days;
      $arr_result['notes']        = $note;
        return $arr_result;

    }
    function get_partial_princi_data($share_holder_id=NULL,$date=NULL,$oderby=NULL,$order=NULL,$arr_where=NULL,$arr_search=NULL,$status=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }

        $this->db->select('pp.partial_principal_amount,pp.principal_balance,DATE(partial_princiapal_added_on) as partial_princiapal_added_on,total_investment_amount');
        $this->db->from('funds_partial_principal pp');
        $this->db->where('pp.share_holder_id',$share_holder_id);
        $this->db->where('pp.IsDeleted','N');
        if($date!=""){
            if($status=='Y'){
                $this->db->where("EXTRACT(YEAR_MONTH FROM partial_princiapal_added_on)=",$date);
            }else{
                $this->db->where("EXTRACT(YEAR_MONTH FROM partial_princiapal_added_on)<",$date);
            }
        }
        if($oderby!="")
            $this->db->order_by($oderby,$order);
        else
            $this->db->order_by('partial_principal_id','DESC');

        $query  = $this->db->get();
        // echo $this->db->last_query();
        $result = $query->result_array();
        return $result;
    }
    function get_full_principal($share_holder_id){
        $this->db->select('d.distribution_amount');
        $this->db->from('funds_project_distributions d');
        $this->db->where('d.distribution_return_status','PR');
        $this->db->where('d.partial_principal_status','0');
        $this->db->where('d.share_holder_id',$share_holder_id);
        $query  = $this->db->get();
        $result = $query->row_array();
        if (empty($result)) {
            return FALSE;
        }else{
            return $result;
        }

    }
    function get_share_holder($arr_where=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('s.project_id,s.share_holder_id,s.number_shares,s.old_number_shares,partial_loan_status,
            s.user_id,s.payement_investor_interest,s.partial_principal_status,u.parent_user,
            y.payment_amount,y.amount_per_share');
        $this->db->from('funds_share_holders s');
        $this->db->join('funds_payments y','y.share_holder_id = s.share_holder_id');
        $this->db->join('funds_projects p','p.project_id = s.project_id');
        $this->db->join('funds_users u','u.user_id = s.user_id');
        $this->db->where('s.IsDeleted','N');
        $this->db->where('y.payment_status <>','D');
        $this->db->group_by('s.share_holder_id');
        $query  = $this->db->get();
        $result = $query->row_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    function get_partial_principal($share_holder_id){
        if($share_holder_id!=""){
            $this->db->where('pp.share_holder_id',$share_holder_id);
        }
        $this->db->select('sum(partial_principal_amount) as total_partial_principal');
        $this->db->from('funds_partial_principal pp');
        $this->db->where('pp.IsDeleted','N');
        $query  = $this->db->get();
        $result = $query->row_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result['total_partial_principal'];
        }
    }
    function check_principal_balance($share_holder_id){
        $available_balance    = 0;
        if($share_holder_id!=""){
            $arr_where               = array('s.share_holder_id'=>$share_holder_id);
            $shareholder_info        = $this->get_share_holder($arr_where);
            $investment_amount       = $shareholder_info['payment_amount'];
            $partial_principal_total = $this->get_partial_principal($share_holder_id);
            // echo $this->db->last_query();
            $partial_princ_total     = 0;
            if(!empty($partial_principal_total)){
                $partial_princ_total = $partial_principal_total;
            }
            $available_balance       = $investment_amount-$partial_princ_total;
            $full_principal_result   = $this->get_full_principal($share_holder_id);
            if(!empty($full_principal_result)){
                $available_balance   =0;
            }
        }
        return $available_balance;
    }
    function get_partial_princi_indv($share_holder_id=NULL,$date=NULL,$oderby=NULL,$order=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('pp.partial_principal_amount,pp.principal_balance,DATE(partial_princiapal_added_on) as partial_princiapal_added_on,total_investment_amount');
        $this->db->from('funds_partial_principal pp');
        $this->db->where('pp.share_holder_id',$share_holder_id);
        $this->db->where('pp.IsDeleted','N');
        if($date!=""){
            $this->db->where("EXTRACT(YEAR_MONTH FROM partial_princiapal_added_on)=",$date);
        }
        if($oderby!="")
            $this->db->order_by($oderby,$order);
        else
            $this->db->order_by('partial_principal_id','DESC');

        $query  = $this->db->get();
        // echo $this->db->last_query();
        $result = $query->result_array();
        return $result;
    }
    function share_payment_row($share_holder_id){
        $this->db->select("s.share_holder_id,s.payement_fund_clear_date,
            s.current_invest_amount,partial_principal_status,p.amount_per_share,s.number_shares,
            s.sale_status");
        $this->db->from('funds_share_holders s');
        $this->db->join('funds_payments p','p.share_holder_id = s.share_holder_id');
        $this->db->where('s.share_holder_id',$share_holder_id);
        $res    = $this->db->get();
        // echo $this->db->last_query();exit;
        $result = $res->row_array();
        return $result;
    }
    function auto_invest_reserved_user($parent_id=NULL,$user_id=NULL){
        //$curr_date = date("Y-m-d");
        if($user_id!='' && $user_id!=NULL){
            $this->db->where('fund_auto_investment.auto_account_id',$user_id);
        }
        $this->db->select('sum(fund_auto_invest_email.payment_amount) as reserved_amount');
        $this->db->from('fund_auto_invest_email');
        $this->db->join('fund_auto_investment','fund_auto_investment.auto_id=fund_auto_invest_email.auto_id','left');
        $this->db->where('fund_auto_investment.user_id',$parent_id);
        $this->db->where('fund_auto_investment.auto_status','A');
        $this->db->where('fund_auto_investment.account_credit','Y');
        $this->db->where('fund_auto_invest_email.auto_email_status','N');
        $this->db->where('fund_auto_invest_email.IsDeleted','N');
        //$this->db->where("fund_auto_invest_email.auto_email_date",$curr_date);
        $res = $this->db->get();
        $result =$res->result_array();
        
        if(!empty($result) && $result[0]['reserved_amount']!="")
            return $result[0]['reserved_amount'];
        else
            return 0;
    }
    function no_days_date_difference($startdate,$enddate){
        $start      = date('Y-m-d',strtotime($startdate));
        $end        = date('Y-m-d',strtotime($enddate));
        $sdate      = strtotime($start);
        $stop_date  = $start;
        $edate      = strtotime($end);
         if($sdate <= $edate){
             $sum = 0;
            for($i = strtotime(($stop_date), strtotime($end)); $i < $edate; $i = strtotime('+1 day', $i)){
               $stop_day=date('d',$i);
               if($stop_day=='31'){
                continue;
               }
               $fulldate = date('Y-m-d',$i);
               $fullmonth = date('m',$i);
               $fullYear = date('Y',$i);
               $sum=$sum+1;
                if($fullmonth=='02' && $stop_day=='28'){
                       $sum=$sum+2; 
                }elseif($fullmonth=='02' && $stop_day=='29'){
                       $sum=$sum+1; 
                }
            }
            return $sum;
        }
    }

    //1099 form

     function get_all_investors_1099($user_id=NULL){
      
      $this->db->select('funds_share_holders.share_holder_id,funds_project_distributions.distribution_id,funds_users.user_id,funds_users.parent_user,funds_project_distributions.share_holder_id');
      $this->db->from('funds_share_holders');
      $this->db->join('funds_project_distributions','funds_project_distributions.share_holder_id=funds_share_holders.share_holder_id');
      $this->db->join('funds_users','funds_project_distributions.user_id=funds_users.user_id');
      $this->db->where('distribution_date >=','2017-01-01');
      $this->db->where('distribution_date <=','2017-12-31');
      $this->db->where('distribution_return_status ','IR');
      $this->db->where('funds_share_holders.IsDeleted', 'N');

      $this->db->where('funds_project_distributions.user_id ='.$user_id.' OR funds_users.parent_user='.$user_id);
      
     
      //$this->db->order_by('funds_users.first_name,funds_users.last_name','ASC');
      $this->db->group_by('funds_project_distributions.user_id');
      $result = $this->db->get(); 
      //echo $this->db->last_query();exit();

      return $result->result_array();
    } 

    function get_interest_received_1098($dev_id=NULL){

      $where ="( YEAR(ds.payment_date) = '2017' OR YEAR(l.payment_date) ='2017' )";

      $this->db->select('d.developer_id,p.project_id,funds_users.user_id,ds.payment_date,l.payment_date');
      $this->db->from('funds_projects p');
      $this->db->join('funds_developers d','d.developer_id=p.developer_id');
      $this->db->join('funds_users','funds_users.user_id = d.user_id','left');
      $this->db->join('funds_developer_schedule ds','ds.project_id=p.project_id','left');
      $this->db->join('funds_developer_loan_schedule l','l.project_id=p.project_id','left');
     // $this->db->where('d.developer_id',$dev_id);
       $this->db->where('d.parent_id ='.$dev_id.' OR d.developer_id='.$dev_id);
      $this->db->where($where);
       $this->db->where('ds.schedule_status','IR');
      $this->db->group_by('d.developer_id');
      
      //$this->db->limit(1,1);
      $result = $this->db->get();
      return $result->result_array();
          
    }

    function get_tax_doc_1098($dev_id=NULL){
        
        $this->db->select('funds_tax_documents.*,funds_developers.developer_id,funds_developers.parent_id');
        $this->db->from('funds_tax_documents');
        $this->db->join('funds_developers','funds_developers.developer_id=funds_tax_documents.developer_id','left');
        $this->db->where('funds_developers.parent_id ='.$dev_id.' OR funds_developers.developer_id='.$dev_id);
        $result = $this->db->get();
        return $result->result_array();
    }

    function get_tax_doc_1099($user_id=NULL){
        
        $this->db->select('funds_tax_documents.*,funds_users.user_id,funds_users.parent_user,funds_users.first_name,funds_users.last_name');
        $this->db->from('funds_tax_documents');
        $this->db->join('funds_users','funds_users.user_id=funds_tax_documents.user_id','left');
        $this->db->where('funds_users.parent_user ='.$user_id.' OR funds_users.user_id='.$user_id);
        $result = $this->db->get();
        return $result->result_array();
    }

    //Interest rate comparison
    function compare_service_fee_waiver($prjt_id = NULL, $uid = NULL, $current_feetotal = NULL,$share_holder_id=NULL)
    {
        
        $user_details    = $this->common->get_row('funds_users', 'user_id,parent_user,user_interest_rate,gross_interest_rate,user_servicefee_override,user_floor_rate,override_effective_date,override_status', array(
            'user_id' => $uid
        ));
        $project_details = $this->common->get_row('funds_projects', 'accrued_interest,fee_anual_return,fee_total,project_servicing_fee', array(
            'project_id' => $prjt_id
        ));
        $override_date      = "";
        if($user_details['override_effective_date']!="" && $user_details['override_effective_date']!="0000-00-00"){
           $override_date       = date('Y-m-d',strtotime($user_details['override_effective_date']));
           $override_date_str   = strtotime($override_date);
        }
        $fund_date ="";
        if($share_holder_id!=""){
            $share_holder_info = $this->common->get_row('funds_share_holders','payement_fund_clear_date',array('share_holder_id'=>$share_holder_id));
            $fc_date           = $share_holder_info['payement_fund_clear_date'];
            if($fc_date!="" && $fc_date!="0000-00-00"){
                $fund_date     = date('Y-m-d',strtotime($fc_date));
                $fund_date_str = strtotime($fund_date);
            }
        }
       
        $user_intrst     = $user_details['user_interest_rate'];
        $net_rtrn        = $project_details['fee_total'];
        $gross_rtrn      = $project_details['fee_anual_return'];
        $floor_rate      = $user_details['user_floor_rate']; 
        
        if($floor_rate!="" && $floor_rate!=0){
           $user_intrst  = $floor_rate;
        }

        if($override_date_str<=$fund_date_str){
            $user_intrst  = $user_intrst;
            $override_date_status='Y';
        }elseif($share_holder_id==""){
            $user_intrst  = $user_intrst;
            $override_date_status='Y';
        }else{
            $user_intrst  = "";
            $override_date_status='N';
        }

        if ($project_details['accrued_interest'] != 0 && $project_details['accrued_interest'] != 0.00) {
            $current_interest_rate = $this->investor_accured_interest_calc($project_details['fee_anual_return'], $net_rtrn, $project_details['accrued_interest']);
            $gross_rtrn            = $gross_rtrn + $project_details['accrued_interest'];
        } else {
            $current_interest_rate = $this->calc_interest_rate_override($gross_rtrn, $net_rtrn, $user_intrst, $prjt_id, $uid,$override_date_status);
        }
        if ($current_feetotal != "") {
            $current_interest_rate = $current_feetotal;
        }
        if (($user_details['user_servicefee_override'] != "" && $user_details['user_servicefee_override'] != 0) && ($floor_rate =="" || $floor_rate==0) && ($override_date_str<=$fund_date_str) ) {
            $compare_rate = $project_details['project_servicing_fee'] * ($user_details['user_servicefee_override'] / 100);
            $interest     = $current_interest_rate + $compare_rate;
            
        } elseif (($user_details['gross_interest_rate'] != "" && $user_details['gross_interest_rate'] != 0) && ($floor_rate =="" || $floor_rate==0) && ($override_date_str<=$fund_date_str)) {
            $compare_rate   = $gross_rtrn * ($user_details['gross_interest_rate'] / 100);
            $share_interest = $compare_rate;
            $interest       = $gross_rtrn - $share_interest;
            if ($current_feetotal > $interest) {
                $interest = $current_feetotal;
            }
        } else {
            $interest = $current_interest_rate;
            if ($current_feetotal != "") {
                $interest = $current_feetotal;
            }
        }

        //Service Fee Waiver (Property Type/Loan Purpose)
        $total_sfw = $this->service_fee_waiver($prjt_id,$uid,$user_details['override_status']);
        if($user_details['override_status']=="Add"){
            $interest = $interest+$total_sfw;
        }elseif($user_details['override_status']=="Over"){
            $interest = $total_sfw;
        }
        
        if ($gross_rtrn >= $interest) {
            $rate = $interest;
        } else {
            $rate = $gross_rtrn;
        }
        
        return $rate;
    }

    //Service Fee Waiver
    function service_fee_waiver($pid = NULL, $user_id = NULL, $status = NULL)
    {
        $main_project = $this->get_row('funds_projects', 'project_asset_type,loan_purpose,project_use,developer_id,pending_project_id', array('project_id' => $pid));
        $dev_project = $this->get_row('funds_dev_projects', 'credit_score_meridian', array('project_id' => $main_project['pending_project_id']));
        $project_risks = $this->common->get_row('funds_project_risks','risk_category',array('project_id'=>$pid,'risk_cat_id'=>'6'));
        $developer_dts = $this->common->get_row('funds_developers','no_years_business',array('developer_id'=>$main_project['developer_id']));

        $where = array('user_id'=>$user_id);
        $service_fee = $this->common->get_table('funds_service_fee_waiver', '*', $where);
        $rate = 0;

        if($status=="Add"){
            foreach ($service_fee as $key => $value) {
                if($value['service_type']=="development_phase"){
                    if(stripos($project_risks['risk_category'], $value['service_type_val']) !== FALSE){
                        $rate = $rate+$value['service_fee'];
                    }
                }
                if($value['service_type_val']==$main_project['project_asset_type']){
                    $rate = $rate+$value['service_fee'];
                }
                if($value['service_type_val']==$main_project['project_use']){
                    $rate = $rate+$value['service_fee'];
                }
                if($value['service_type_val']==$main_project['loan_purpose']){
                    $rate = $rate+$value['service_fee'];
                }
                if($value['service_type']=="credit_score" && $dev_project['credit_score_meridian']!=''){
                    $credit_score = $value['service_type_val'];
                    $score = explode('-', $credit_score);
                    if($credit_score=="550" && $dev_project['credit_score_meridian']<550){
                        $rate = $rate+$value['service_fee'];
                    }
                    else if ($score[0]!='' && $score[1]!='') {
                        if($dev_project['credit_score_meridian']>=550 && $dev_project['credit_score_meridian']<=599){
                            $rate = $rate+$value['service_fee'];
                        }
                        else if($dev_project['credit_score_meridian']>=600 && $dev_project['credit_score_meridian']<=649){
                            $rate = $rate+$value['service_fee'];
                        }
                        else if($dev_project['credit_score_meridian']>=650 && $dev_project['credit_score_meridian']<=679){
                            $rate = $rate+$value['service_fee'];
                        }
                        else if($dev_project['credit_score_meridian']>=680 && $dev_project['credit_score_meridian']<=699){
                            $rate = $rate+$value['service_fee'];
                        }
                        else if($dev_project['credit_score_meridian']>=700 && $dev_project['credit_score_meridian']<=759){
                            $rate = $rate+$value['service_fee'];
                        }
                        else if($dev_project['credit_score_meridian']>=760 && $dev_project['credit_score_meridian']<=850){
                            $rate = $rate+$value['service_fee'];
                        }
                    }
                }
                if($value['service_type']=="track_record"){
                    if(stripos($developer_dts['no_years_business'], $value['service_type_val']) !== FALSE){
                        $rate = $rate+$value['service_fee'];
                    }
                }
            }
        }

        $flag = 6;
        if($status=="Over"){
            foreach ($service_fee as $key => $value) {
                if($value['service_type']=="development_phase" && $value['service_fee']!='' && $value['service_fee']!=0 && $flag>1){
                    if(stripos($project_risks['risk_category'], $value['service_type_val']) !== FALSE){
                        $rate = $value['service_fee'];
                        $flag = 1;
                    }
                }
                else if($value['service_type']=="project_asset_type" && $value['service_fee']!='' && $value['service_fee']!=0 && $flag>2){
                    if($value['service_type_val']==$main_project['project_asset_type']){
                        $rate = $value['service_fee'];
                        $flag = 2;
                    }
                }
                else if($value['service_type']=="project_use" && $value['service_fee']!='' && $value['service_fee']!=0 && $flag>2){
                    if($value['service_type_val']==$main_project['project_use']){
                        $rate = $value['service_fee'];
                        $flag = 2;
                    }
                }
                else if($value['service_type']=="credit_score" && $dev_project['credit_score_meridian']!='' && $value['service_fee']!='' && $value['service_fee']!=0 && $flag>3){
                    $credit_score = $value['service_type_val'];
                    $score = explode('-', $credit_score);
                    if($credit_score=="550" && $dev_project['credit_score_meridian']<550){
                        $rate = $value['service_fee'];
                        $flag = 3;
                    }
                    else if ($score[0]!='' && $score[1]!='') {
                        if($dev_project['credit_score_meridian']>=550 && $dev_project['credit_score_meridian']<=599){
                            $rate = $value['service_fee'];
                            $flag = 3;
                        }
                        else if($dev_project['credit_score_meridian']>=600 && $dev_project['credit_score_meridian']<=649){
                            $rate = $value['service_fee'];
                            $flag = 3;
                        }
                        else if($dev_project['credit_score_meridian']>=650 && $dev_project['credit_score_meridian']<=679){
                            $rate = $value['service_fee'];
                            $flag = 3;
                        }
                        else if($dev_project['credit_score_meridian']>=680 && $dev_project['credit_score_meridian']<=699){
                            $rate = $value['service_fee'];
                            $flag = 3;
                        }
                        else if($dev_project['credit_score_meridian']>=700 && $dev_project['credit_score_meridian']<=759){
                            $rate = $value['service_fee'];
                            $flag = 3;
                        }
                        else if($dev_project['credit_score_meridian']>=760 && $dev_project['credit_score_meridian']<=850){
                            $rate = $value['service_fee'];
                            $flag = 3;
                        }
                    }
                }
                else if($value['service_type']=="track_record" && $value['service_fee']!='' && $value['service_fee']!=0 && $flag>4){
                    if(stripos($developer_dts['no_years_business'], $value['service_type_val']) !== FALSE){
                        $rate = $value['service_fee'];
                        $flag = 4;
                    }
                }
                else if($value['service_type']=="loan_purpose" && $value['service_fee']!='' && $value['service_fee']!=0 && $flag>5){
                    if($value['service_type_val']==$main_project['loan_purpose']){
                        $rate = $value['service_fee'];
                        $flag = 5;
                    }
                }
            }
        }

        return $rate;
    }
    #borrower payment_status
    function borrower_payment_status($project_id,$schedule_date,$schedule_amount=NULL){
      
        $project_details            = $this->get_row('funds_projects','project_id,project_dev_payment_due,project_dev_payment_charge_off,project_late_fee,project_default_interest,project_type,project_goal,schedule_default_status,project_construction_loan,project_extend_loan',array('project_id'=>$project_id));
        $result['status']           = "";
        $current_date               = date('Y-m-d');
        $current_date_str           = strtotime($current_date);
        $schedule_date              = date('Y-m-d',strtotime($schedule_date));
        
        $schedule_date_str          = strtotime($schedule_date);
        $project_grace_end_date     = strtotime(date('Y-m-d', strtotime($schedule_date . ' + 20 day')));
        $project_default_start_date = strtotime(date('Y-m-d', strtotime($schedule_date . ' + 30 day')));
        $project_default_end_date   = strtotime(date('Y-m-d', strtotime($schedule_date . ' + 60 day')));
       
        $result['late_amount']      = $result['default_amount']= 0;
        $result['constr_default_amnt']=0;
        $default_amount             = $latefee_amount= 0;
        $schedule_amount            = str_replace(array('%',',','$'),'',$schedule_amount);
        $project_default_perc       = str_replace(array('%',',','$'),'',$project_details['project_default_interest']);
        $project_late_perc          = str_replace(array('%',',','$'),'',$project_details['project_late_fee']);
        if($project_late_perc>0){
            $latefee_amount         = $schedule_amount *($project_details['project_late_fee']/100);
        }

        $ach_payment_data = $this->get_ach_payment_status($project_id);
        if($project_details['project_extend_loan']=='Y' && $project_details['project_construction_loan'] =='N'){
            $ach_payment_data = $this->get_ach_payment_status1($project_id);
        }

        if($project_details['project_dev_payment_due']=='Y' || $project_details['project_dev_payment_charge_off']=='Y'){
            $result['status']   = 'No Payment Due';
        }else if($project_details['project_type']=='PC'){
            $result['status']   = "Paid";
        }else if($schedule_date_str >= $current_date_str){
            $result['status']   = "Current";

            if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                $result['status'] = "ACH Processing";
            }
        }else if($current_date_str < $project_grace_end_date){
            $result['status']   = "Grace Period";

            if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                $result['status'] = "ACH Processing";
            }
        }else if(($current_date_str > $project_grace_end_date && $current_date_str > $project_default_end_date) || $project_details['schedule_default_status']=='Y'){
            $result['status']   = "Default";
            if($project_default_perc>0){  //default interest
                $default_amount = ($project_details['project_goal']*($project_default_perc/100))/12;
                #construction loan
                if($project_details['project_construction_loan']=='Y'){
                    $construction_def = $this->construction_default($project_details,$schedule_date);
                    $result['constr_default_amnt']=$construction_def['sum_con_amount'];
                }
            }
            $result['default_amount']= $default_amount;
            $result['late_amount']   = $latefee_amount;

        }else if($current_date_str >=  $project_grace_end_date){ // &&  $current_date_str <= $project_default_start_date
            $result['status']        = "Past Due";
            $result['late_amount']   = $latefee_amount;
        }

        return $result;
    }
    function construction_default($project_details=array(),$schedule_date=NULL){
        if($project_details['project_construction_loan']=='Y'){
                $construction_details = $this->get_table('funds_project_construction_loan_schedule','construction_closing_date,construction_loan_amount,construction_schedule_date,',array('project_id' => $project_details['project_id'],'construction_schedule_date' => $schedule_date));
                $sum_camount = 0; 
                if(!empty($construction_details)){
                    foreach($construction_details as $data){
                        $sch_camt = $data['construction_loan_amount'];
                        $sch_cdat = $data['construction_schedule_date'];
                        $cls_cdat = $data['construction_closing_date'];
                        $nw_cls   = date('Y-m',strtotime($cls_cdat.'+1 month'));
                        $nw_sch   = date('Y-m',strtotime($sch_cdat));
                        $nw_schdt = date('d',strtotime($cls_cdat));
                        $camount  = (($sch_camt) * (($project_details['project_default_interest'])/100) / 12);
                        if($nw_cls==$nw_sch){
                           $camount  = ($camount/30)*((30-$nw_schdt)+1);
                        } 
                         $sum_camount = $sum_camount + $camount;
                    }
                } 
                $result['sum_con_amount'] =$sum_camount;
                return $result;
            } 
    }

    function send_admin_email_appraisal($from='',$to, $subject, $body, $attachment = null,$cc_array = NULL, $bcc = NULL)
    {
        
        
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $this->email->initialize($config);
        $this->email->from('processing@sharestates.com', 'Sharestates');
        //$this->email->reply_to('Kevin@sharestates.com','');
        //$this->email->reply_to('Allen@sharestates.com');
       if(!empty($cc_array)){
        $this->email->cc($cc_array);
        }
        if ($bcc != '') {
       // $ary=array('prinuannie@gmail.com,hemaravi7878@gmail.com');
        
        $this->email->bcc('help@ssapp.support');
        }
        
        $this->email->to($to);
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
     function million_conversion($n) {

        if($n>1000000000000) {

            $result['display_amount']= floor($n/1000000000000);
            
            $result['display_label'] = 'Trillion';
            $result['display_label_first'] = 'T';
            $result['display_value'] = $result['display_amount'].' Trillion';
            
        }elseif ($n > 1000000000){ 

            /*$result['display_amount']= floor($n/1000000000);*/
            $result['display_amount']= $n/1000000000;
            $result['display_label'] = 'Billion';
            $result['display_label_first'] = 'B';
            $result['display_value'] = $result['display_amount'].' Billion';
        }elseif ($n > 1000000){ 
            $result['display_amount']= floor($n/1000000);
            $result['display_label'] = 'Million';
            $result['display_label_first'] = 'M';
            $result['display_value'] = $result['display_amount'].' Million';
        }elseif ($n > 1000){
            $result['display_amount'] =floor($n/1000);
            $result['display_label']  = 'Thousand';
             $result['display_label_first'] = 'K';
            $result['display_value']  = $result['display_amount'].' Thousand';
        }elseif ($n > 100){
            $result['display_amount'] =floor($n/100);
            $result['display_label']  = 'Hundred';
            $result['display_label_first'] = 'H';
            $result['display_value']  = $result['display_amount'].' Hundred';
        }else{
            $result['display_amount'] =$n;
            $result['display_label']  = '';
            $result['display_label_first'] = '';
            $result['display_value']  = '';
        }
        

        $result['display_amount'] = number_format($result['display_amount'],2);
        return $result;
    }

    function million_conversion_withoutfloor($n) {

        if($n>1000000000000) {

            $result['display_amount']= floor($n/1000000000000);
            
            $result['display_label'] = 'Trillion';
            $result['display_label_first'] = 'T';
            $result['display_value'] = $result['display_amount'].' Trillion';
            
        }elseif ($n > 1000000000){ 

            /*$result['display_amount']= floor($n/1000000000);*/
            $result['display_amount']= $n/1000000000;
            $result['display_label'] = 'Billion';
            $result['display_label_first'] = 'B';
            $result['display_value'] = $result['display_amount'].' Billion';
        }elseif ($n > 1000000){ 
            $result['display_amount']= $n/1000000;
            $result['display_label'] = 'Million';
            $result['display_label_first'] = 'M';
            $result['display_value'] = $result['display_amount'].' Million';
        }elseif ($n > 1000){
            $result['display_amount'] =$n/1000;
            $result['display_label']  = 'Thousand';
             $result['display_label_first'] = 'K';
            $result['display_value']  = $result['display_amount'].' Thousand';
        }elseif ($n > 100){
            $result['display_amount'] =$n/100;
            $result['display_label']  = 'Hundred';
            $result['display_label_first'] = 'H';
            $result['display_value']  = $result['display_amount'].' Hundred';
        }else{
            $result['display_amount'] =$n;
            $result['display_label']  = '';
            $result['display_label_first'] = '';
            $result['display_value']  = '';
        }
        

        $result['display_amount'] = number_format($result['display_amount'],2);
        return $result;
    }
    function array_sort($array, $on, $order=SORT_ASC){
    
        $new_array = array();
        $sortable_array = array();

        if (count($array) > 0) {
            foreach ($array as $k => $v) {
                if (is_array($v)) {
                    foreach ($v as $k2 => $v2) {
                        if ($k2 == $on) {
                            $sortable_array[$k] = $v2;
                        }
                    }
                } else {
                    $sortable_array[$k] = $v;
                }
            }

            switch ($order) {
                case SORT_ASC:
                    asort($sortable_array);
                break;
                case SORT_DESC:
                    arsort($sortable_array);
                break;
            }

            foreach ($sortable_array as $k => $v) {
                $new_array[$k] = $array[$k];
            }
        }
        return $new_array;
    }
     function checkmail_attach_bcc_cc_from($from=NULL,$to, $subject, $body, $attachment = null,$bccarray=NULL,$ccarray=NULL)
    {
        $this->load->library('email');
        $this->email->clear(TRUE);
        $config['mailtype'] = 'html';
        $config['charset'] = 'utf-8';
        $this->email->initialize($config);
        if($from!=""){
            $this->email->from($from, 'Sharestates');
        }else{
            $this->email->from('Greetings@sharestates.com', 'Sharestates');
        }
        $this->email->to($to);
        if(!empty($bccarray)){
                $this->email->bcc($bccarray);
          // $bccarray = array('prasadcg@gmail.com', 'hari.maddali@gmail.com');  
        }
        if(!empty($ccarray)){
       
             $this->email->cc($ccarray);
            
         }
    
        $this->email->subject($subject);
        $this->email->message($body);
        if (isset($attachment) && !empty($attachment)) {
            foreach ($attachment as $path) {
                $this->email->attach($path);
            }
        }
        $this->email->send();
    }
    function get_sub_brokers($parent_broker_id){
        $this->db->select('broker_id,
            CONCAT(broker_first_name, " ", broker_last_name) as broker_name',FALSE );
        $this->db->from('funds_project_broker');
        $this->db->where('sub_broker', $parent_broker_id);
        $this->db->order_by('broker_id','DESC');
        $query = $this->db->get();
        $result = $query->result_array();
        if ($query->num_rows() > 0)
            return $result;
        else
            return FALSE;
    }
    function subbroker($parent_id, $project_id){
            $this->db->select('sub_broker_id');
            $this->db->from('quick_loan_app_subbroker_assigned_loans');
            $this->db->where('broker_id', $parent_id);
            $this->db->where('project_id', $project_id);
            $res    = $this->db->get();
            $result = $res->row_array();
            return $result;
    }

    function get_loan_tapes(){

        // $this->db->select("(CASE WHEN parent_id!='' THEN parent_id else user_id END) as user,doc_name");
        $this->db->select("user_id as user,doc_name");
        $this->db->from('funds_loan_tape_doc');
        $this->db->where('IsDeleted','N');
        $result =  $this->db->get();
        return $result->result_array();
    }
    #
    function outstanding_principal($arr_where=NULL){
        $this->db->select('partial_principal_status,sum(distribution_amount) as outstanding_principal');
        $this->db->from('funds_project_distributions d');
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $result = $this->db->get();
        $res    = $result->row_array();
        if(!empty($res)){
            return $res['outstanding_principal'];
        }else{
            return 0;
        }
    }
    function other_investor_investment($user_id=NULL,$arr_where=NULL,$sale_status=NULL,$sale_date=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        if($sale_status=='I'){
            $this->db->where('s.sale_status','I');
            if($sale_date!=""){
                $this->db->where('DATE(s.sale_date)',$sale_date);
            }
        }else{
            $this->db->where('s.sale_status <>','I');
        }
        $this->db->select('s.share_holder_id');
        $this->db->from('funds_share_holders s');
        $this->db->join('funds_payments y','s.share_holder_id =y.share_holder_id');
        $this->db->where('s.IsDeleted','N');
        $this->db->where('y.payment_status <>','D');
        // $this->db->where('s.share_holder_id <>',$share_holder_id);
        $this->db->where('s.user_id <>',$user_id);
        $result = $this->db->get();
        $res    = $result->row_array();
        return  $res;
    }
    function get_max_invamount_same_user($user_id=NULL,$project_id=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('s.share_holder_id');
        $this->db->from('funds_share_holders s');
        $this->db->join('funds_payments y','s.share_holder_id =y.share_holder_id');
        $this->db->where('s.IsDeleted','N');
        $this->db->where('y.payment_status <>','D');
        $this->db->where('s.number_shares = (select max(`number_shares`) from funds_share_holders where funds_share_holders.project_id="'.$project_id.'" and funds_share_holders.user_id="'.$user_id.'" and funds_share_holders.IsDeleted="N" order by share_holder_id ASC)');
        $this->db->where('s.user_id',$user_id);
        $this->db->where('s.project_id',$project_id);
        $this->db->order_by('s.share_holder_id','ASC');
        $result = $this->db->get();
        $res    = $result->row_array();
        return  $res;
    }
    function latest_investor($user_id=NULL,$project_id=NULL,$sale_status=NULL,$sale_date=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        if($sale_status=='I'){
            $this->db->where('s.sale_status','I');
            if($sale_date!=""){
                $this->db->where('DATE(s.sale_date)',$sale_date);
            }
        }else{
            $this->db->where('s.sale_status <>','I');
        }
        $this->db->select('s.share_holder_id');
        $this->db->from('funds_share_holders s');
        $this->db->join('funds_payments y','s.share_holder_id =y.share_holder_id');
        $this->db->where('s.IsDeleted','N');
        $this->db->where('y.payment_status <>','D');
        $this->db->where('s.user_id',$user_id);
        $this->db->where('s.project_id',$project_id);
        $this->db->where('(s.payement_fund_clear_date!="" AND s.payement_fund_clear_date!="0000-00-00" AND s.payement_fund_clear_date!="0000-00-00 00:00:00" )');
        $this->db->order_by('DATE(s.payement_fund_clear_date)','ASC');
        // $this->db->order_by('s.share_holder_id','DESC');
        $result = $this->db->get();
        $res    = $result->row_array();
        return  $res;
    }
    #
    function list_share_holders($project_id,$schedule_date,$prev_payment_date_Ym){
        $this->db->select('funds_share_holders.share_updated_on,funds_share_holders.share_holder_id, funds_share_holders.user_id, funds_share_holders.project_id, funds_share_holders.number_shares, funds_share_holders.old_number_shares, funds_share_holders.payement_fund_clear_date, funds_share_holders.payement_investor_interest, funds_share_holders.sale_status, funds_share_holders.partial_loan_status, funds_share_holders.IsDeleted as shareholder_deleted,funds_share_holders.promocode_applied,funds_share_holders.investor_bonus_point, 
                             funds_payments.payment_id, funds_payments.payment_amount, funds_payments.amount_per_share, funds_payments.payment_date, funds_payments.payment_status, funds_payments.payment_type, funds_payments.IsDeleted as payment_deleted,
                              funds_projects.project_name, funds_projects.project_goal, funds_projects.project_share, funds_projects.fee_anual_return, funds_projects.fee_total, funds_projects.project_type, funds_projects.project_default_interest, funds_projects.project_late_fee, funds_projects.project_servicing_fee, funds_projects.project_extend_loan, funds_projects.project_close_date, funds_projects.project_payoff_date, funds_projects.loan_sale_status, funds_projects.loan_sale_date, funds_projects.IsDeleted as project_deleted, funds_projects.project_servicing_outsourced,
                              funds_users.parent_user,funds_users.waive_late_def_status,
                              funds_users.full_loan_sale_status,
                             funds_projects.project_holdback_status,
                             funds_projects.project_holdback_amount,
                             funds_share_holders.partial_principal_status,
                             funds_share_holders.sale_date,
         funds_projects.loan_sale_status_more,
         funds_users.first_name,funds_projects.project_construction_loan,funds_users.ancillary_late_fee,funds_users.ancillary_default_fee,funds_users.ancillary_pre_payment_penalty,funds_users.whole_loan_buyer_status');
        $this->db->from('funds_share_holders');
        $this->db->join('funds_payments','funds_payments.share_holder_id=funds_share_holders.share_holder_id');
        $this->db->join('funds_users','funds_users.user_id=funds_share_holders.user_id');
        $this->db->join('funds_projects','funds_projects.project_id=funds_share_holders.project_id');
        $this->db->where('funds_share_holders.IsDeleted','N');
        $this->db->where('funds_payments.IsDeleted','N');
        $this->db->where('funds_projects.project_id',$project_id);
        $this->db->where('((funds_share_holders.sale_status="I" AND  EXTRACT(YEAR_MONTH FROM funds_share_holders.sale_date)>"'.$prev_payment_date_Ym.'" ) OR  (funds_share_holders.sale_status !="I") )');
        $this->db->order_by('funds_users.first_name');
        $result = $this->db->get();
        return $result->result_array();
    }
    #
    function loansale_date_info($arr_where=NULL){
        if(!empty($arr_where)){
          $this->db->where($arr_where);
        }
        $this->db->select('new_investor_sale_date');
        $this->db->from('funds_investor_saledate sd');
        $this->db->order_by('sd.investor_saledate_id','DESC');
        $res    = $this->db->get();
        $result = $res->row_array();
        return $result;
    }
    #
    function loansale_date_list($arr_where=NULL){
        if(!empty($arr_where)){
          $this->db->where($arr_where);
        }
        $this->db->select('new_investor_sale_date,share_holder_id_list');
        $this->db->from('funds_investor_saledate sd');
        $this->db->order_by('sd.investor_saledate_id','DESC');
        $res    = $this->db->get();
        $result = $res->result_array();
        return $result;

    } 
    #
    function loan_sale_prev_list($arr_where=NULL,$saledate=NULL){
        if(!empty($arr_where)){
          $this->db->where($arr_where);
        }
        if($saledate!=""){
          $this->db->where('DATE(sd.new_investor_sale_date) <',$saledate);
        }
        $this->db->select('new_investor_sale_date');
        $this->db->from('funds_investor_saledate sd');
        $this->db->order_by('DATE(sd.new_investor_sale_date)','DESC');
        $res    = $this->db->get();
        $result = $res->row_array();
        return $result;
    } 
    #
    function sale_princi_approve($project_id,$sale_date){
        $this->db->select('d.distribution_id');
        $this->db->from('funds_project_distributions d');
        $this->db->where('d.project_id',$project_id);
        $this->db->where('d.distribution_return_status','PR');
        $this->db->where('(DATE(d.distribution_sale_date)="'.$sale_date.'")');
        $res     = $this->db->get();
        $result  = $res->row_array();
        return $result;

    }
    function get_distribution_moresale($arr_where=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('d.distribution_id');
        $this->db->from('funds_project_distributions d');
        $this->db->join('funds_generate_distribution g','g.distribution_id = d.distribution_id');
        $res     = $this->db->get();
        $result  = $res->row_array();
        return $result;
    }
    #
    function get_distribution_multiple_sale($arr_where=NULL,$loansale_date=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        if($loansale_date!=""){
            $this->db->where('DATE(s.sale_date)',date('Y-m-d',strtotime($loansale_date)));
        }
        $this->db->select('d.distribution_id');
        $this->db->from('funds_project_distributions d');
        $this->db->join('funds_generate_distribution g','g.distribution_id = d.distribution_id');
        $this->db->join('funds_share_holders s','s.share_holder_id =d.share_holder_id');
        $res     = $this->db->get();
        $result  = $res->row_array();
        return $result;
    }
    function get_construction_schedule_month_payoff($arr_where=NULL,$date=NULL,$prev_day_date){
       
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('sum(c.construction_interest_amount) as amount');
        $this->db->from('funds_project_construction_loan_schedule c');
        $this->db->where('((EXTRACT(YEAR_MONTH FROM construction_schedule_date) ="'.$date.'") OR DATE(construction_schedule_date)="'.$prev_day_date.'")');
        $query  = $this->db->get();
        $result = $query->row_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    #
    function get_schedule_constr_amt($arr_where=NULL,$date=NULL,$prev_day_date){
       
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('schedule_amount as amount');
        $this->db->from('funds_payment_schedule c');
        $this->db->where('((EXTRACT(YEAR_MONTH FROM schedule_date) ="'.$date.'") OR DATE(schedule_date)="'.$prev_day_date.'")');
        $this->db->order_by('c.schedule_date','DESC');
        $query  = $this->db->get();
        $result = $query->row_array();
        if (empty($result)) {
            return FALSE;
        } else {
            return $result;
        }
    }
    #
    function last_schedule_amt_payoff($arr_where=NULL){
        $this->db->select('schedule_amount as amount');
        $this->db->from('funds_payment_schedule y');
        $this->db->where('(costruction_draw_status="Y")');
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->order_by('(y.schedule_date)','DESC');
        $this->db->limit(1,0);
        $query  = $this->db->get();
        $result = $query->row_array();
        return $result;

    }
    function get_construction_draw($pid=NULL){
        $this->db->select('*,sum(c_loan_amount) as c_loan_amount');
        $this->db->from('funds_project_construction_loan');
        $this->db->where('project_id',$pid);
        $result = $this->db->get();
        return $result->row_array();
    }
    function available_promised_amount($wh_id=NULL){
        $get_wh_info =  $this->get_row('funds_warehouse','wh_max_promised_amount',array('wh_id'=>$wh_id));
        $active_investment= $this->get_active_investment(array('whl.wh_id'=>$wh_id),$wh_id);
        $result['remaining_promised_balance']  = $get_wh_info['wh_max_promised_amount']-$active_investment['total_investment'];
        return $result;
    }
    #
    function get_active_investment($arr_where=NULL,$wh_id){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        $this->db->select('sum(whl.whl_invest_amount) as total_investment');
        $this->db->from('funds_whl_investors whl');
        $this->db->join('funds_warehouse w','w.wh_id = whl.wh_id');
        $this->db->join('funds_projects p','p.project_id = whl.project_id');
        $this->db->where('whl.project_id not in (select funds_warehouse_distribution.project_id FROM funds_warehouse_distribution  join funds_whl_investors on funds_warehouse_distribution.whl_investor_id = funds_whl_investors.whl_investor_id WHERE wh_dist_interest_type="PR" AND funds_warehouse_distribution.wh_id ="'.$wh_id.'")');
        $this->db->where('whl.IsDeleted','N');
        $query  = $this->db->get();
        // echo $this->db->last_query();exit;
        $result = $query->row_array();
        return $result;
    }
    #delete warehosue investor -Reschedule,Adjurned
    function delete_whl_investor($pending_project_id,$whl_entity,$type,$aid){
        if($whl_entity=='dacl_llc'){
          $wh_id ='15';
        }elseif($whl_entity=='sharestates_llc'){
          $wh_id ='19';
        }elseif($whl_entity=='loan_trust_llc'){
          $wh_id ='19';
        }elseif($whl_entity=='intercap_llc'){
          $wh_id ='21';
        }elseif($whl_entity=='prime_meridian_real_estate'){
          $wh_id ='22';
        }else{
          $wh_id ='';
        }
        $investment_exist  = $this->whl_investor($pending_project_id,$wh_id);
        // echo $this->db->last_query();exit;
         if(!empty($investment_exist)){
            foreach ($investment_exist as $key => $inv) {
                # code...
            
            $arr_where     = array('whl_investor_id'=>$inv['whl_investor_id']);
            $available_bal = intval($inv['wh_available_cash_balance'])+intval($inv['whl_invest_amount']);
            $balance_array = array('wh_available_cash_balance'=>$available_bal);
            $this->update_values('funds_warehouse',array('wh_id'=>$inv['wh_id']),$balance_array);
            $delete_array  = array('IsDeleted' => 'Y','DeletedBy'=>$aid,'DeletedDate'=>date('Y-m-d'),'whl_admin_comment'=>$type);
            $this->update_values('funds_whl_investors',$arr_where,$delete_array);
           
            // $this->common->update_values('funds_whl_investors',array('whl_investor_id'=>$investment_exist['whl_investor_id']),)
         }
         return true;
        }
    }
    function whl_investor($pending_project_id,$wh_id){
        $this->db->select('wi.whl_investor_id,wi.whl_invest_amount,wi.wh_id,
            w.wh_available_cash_balance');
        $this->db->from('funds_whl_investors wi');
        $this->db->join('funds_warehouse w','w.wh_id = wi.wh_id');
        $this->db->join('funds_projects p','p.project_id = wi.project_id');
        $this->db->join('funds_dev_projects dev','dev.project_id = p.pending_project_id');
        //$this->db->where('wi.wh_id',$wh_id);
        $this->db->where('dev.project_id',$pending_project_id);
        $this->db->where('wi.IsDeleted <>','Y');
       // $this->db->where('added_from','C');
        $this->db->where('wi.whl_investor_id not in (select whl_investor_id from funds_warehouse_distribution)');
        $res    = $this->db->get();
       // $result = $res->row_array();
         $result = $res->result_array();
        return $result;
    }
    #
    function deposit_amount(){
        $this->db->select('d.deposit_id,d.deposit_amount,bank_routing_num,d.user_id,
            b.bank_routing_num,b.bank_acc_no,b.bank_nickname,b.bank_acc_type,d.deposit_bank,b.bank_id');
        $this->db->from('funds_deposit d');
        $this->db->join('fund_bank b', 'b.bank_id = d.deposit_bank');
         $this->db->where('d.deposit_bank IS NOT NULL');
        $this->db->where('d.IsDeleted !=', 'Y');
        $this->db->where('d.deposit_ach_status', 0);
        $this->db->group_by('d.deposit_id');
        $query  = $this->db->get();
        $result = $query->result_array();
        return $result;
    }
    #
     function get_deposit_funds($user_id=NULL,$arr_search=NULL){
        if(!empty($arr_search)){
            if($arr_search['user_id']!= ''){
                $where        = array('d.user_id'=>$arr_search['user_id']);
                $this->db-> where($where);
            }else{
                $this->db->where("(d.user_id = '".$user_id."' or u.parent_user = '".$user_id."')");
            }

            if($arr_search['year']!= ''){
                if($arr_search['year']== 'year_date'){
                    $this->db->where('YEAR(d.deposit_date)',date('Y'));
                }elseif($arr_search['year']== '1year'){
                    $curr_date = date("Y-m-d");
                    $oneYearOn = date('Y-m-d',strtotime(date("Y-m-d", mktime()) . " - 365 day"));
                    $this->db->where('DATE(d.deposit_date) >=',$oneYearOn);
                    $this->db->where('DATE(d.deposit_date) <=',$curr_date);
                }
            }

        }else{
            $this->db->where("(d.user_id = '".$user_id."' or d.parent_user = '".$user_id."')");
        }
        $this->db->select('d.deposit_id,deposit_amount,d.deposit_bank,deposit_date,
            d.payment_status,d.deposit_ach_status,d.funds_clear_date,d.ach_success_status,
            d.ach_success_date,d.deposit_ach_status,d.ach_rejection_date,ach_rejection_code,
            DATE(d.deposit_date) as date,
            b.bank_name,b.bank_nickname,b.bank_acc_no,
            u.first_name,u.last_name,u.parent_user,u.sub_user_type,
            u.sub_jacc_first_name,u.sub_jacc_last_name');
        $this->db->from('funds_deposit d');
        $this->db->join('funds_users u','u.user_id = d.user_id');
        $this->db->join('fund_bank b', 'b.bank_id  = d.deposit_bank','left');
        $this->db->where('d.IsDeleted','N');
        $result = $this->db->get();
        // echo $this->db->last_query();exit;
        return $result->result_array();
    }
    function reflected_date($date){
        $holidays           = $this->holiday_list(); //array('2018-01-01','2018-01-15','2018-02-19','2018-05-28','2018-07-04','2018-09-03','2018-10-08','2018-11-12','2018-11-22','2018-12-25');
        $suc_fund_date      = $date;
        $comp_ach_fund_date = new DateTime($suc_fund_date);
        if(in_array($suc_fund_date, $holidays)){ //checking in holiday list
            $comp_ach_fund_date->modify('+1 day');
        }
        $suc_fund_check_date          = $comp_ach_fund_date->format('Y-m-d');
        $compare_ach_fund_weekDay     = date('w', strtotime($suc_fund_check_date));

        if($compare_ach_fund_weekDay == 0){ //sunday
            $comp_ach_fund_date       = new DateTime($suc_fund_date);
            $comp_ach_fund_date->modify('+5 day');
            $suc_fund_nxt_date  =  $comp_ach_fund_date->format('Y-m-d');
        }else if($compare_ach_fund_weekDay == 6 || $compare_ach_fund_weekDay == 5 || $compare_ach_fund_weekDay == 4 || $compare_ach_fund_weekDay == 3 || $compare_ach_fund_weekDay == 2){ //saturday //friday //thursday //wednesday // tuesday
            $comp_ach_fund_date       = new DateTime($suc_fund_date);
            $comp_ach_fund_date->modify('+6 day');
            $suc_fund_nxt_date  =  $comp_ach_fund_date->format('Y-m-d');
        }else{
            $suc_fund_nxt_date  = date('Y-m-d',strtotime($suc_fund_check_date.'+4 days')); //$suc_fund_check_date;
        }
        if(in_array($suc_fund_nxt_date, $holidays)){ //checking in holiday list
            $suc_fund_nxt_date  = new DateTime($suc_fund_nxt_date);
            $suc_fund_nxt_date->modify('+1 day');
            $suc_fund_nxt_date   = $suc_fund_nxt_date->format('Y-m-d');
        }   
        $reflected_date      = date('m/d/Y',strtotime($suc_fund_nxt_date)); 
        return $reflected_date;
    }
    function holiday_list(){
        $holiday_array  = array('2020-01-01','2020-01-20','2020-02-17','2020-05-25','2020-07-03','2020-07-04','2020-09-07','2020-10-12','2020-11-11','2020-11-26','2020-12-25');
        return $holiday_array;
    }
    function pipelineterm_shareline($project_id){
        $this->db->select('dev.project_estimated_term,user_type');
        $this->db->from('funds_dev_projects dev');
        $this->db->join('quik_loan_applications q','dev.project_id = q.project_id');
        $this->db->join('quik_loan_app_transaction_details t','t.quik_transation_id = q.quik_transaction_id');
        $this->db->where('dev.project_id',$project_id);
        $res    = $this->db->get();

        $result = $res->row_array();
        // print_r($result);exit;
        return $result;
    }
    function get_greater_maturity_princi($arr_where,$date=NULL){
        if(!empty($arr_where)){
            $this->db->where($arr_where);
        }
        if($date!=""){
            $this->db->where('DATE(partial_princiapal_added_on)>',date('Y-m-d',strtotime($date)));
        }
        $this->db->select('pr.partial_princiapal_added_on,sum(partial_principal_amount) as partial_princi');
        $this->db->from('funds_partial_principal pr');
        $this->db->group_by('DATE(pr.partial_princiapal_added_on)');
        $res    = $this->db->get();
        $result = $res->result_array();
        return $result;

    }

    function send_tax_email($from = "Greetings@sharestates.com", $to, $subject, $body, $to_user = NULL, $attachment = NULL, $Bcc = NULL,$cc=NULL){
        
        if($from == ""){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }elseif($from == "LoanServicing@sharestates.com"){
            $name = "Sharestates LoanServicing";
        }elseif($from == "processing@sharestates.com"){
            $name = "Sharestates";
        }else{
            $name = "Sharestates";
        }

        if($from == "LoanServicing@sharestates.com"){
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }elseif($from == "processing@sharestates.com"){
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: processing@sharestates.com' . "\r\n";
        }else{
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: '.$from. "\r\n";
        }
       
       // $headers .= 'Bcc: prasadcg@gmail.com' . "\n";      
        if ($Bcc != '') {
            $headers .= 'Bcc: '.$Bcc. "\n";
        }
        // if ($cc != '') {
        //     $headers .= 'cc: '.$cc. "\n";
        // }
        $headers .= 'X-Mailer: PHP/' . phpversion();
        $body = wordwrap($body, 70, "\n");
        return mail($to, $subject, $body, $headers);
        
    }
    function check_distribution_last_date($share_holder_id){
        $this->db->select('DATE(g.schedule_date) as schedule_date');
        $this->db->from('funds_project_distributions d');
        $this->db->join('funds_generate_distribution g','d.distribution_id = g.distribution_id','left');
        $this->db->where('d.share_holder_id',$share_holder_id);
        $this->db->group_by('DATE(g.schedule_date)');
        $this->db->order_by('DATE(g.schedule_date)','DESC');
        $res    = $this->db->get();
        $result = $res->row_array();
        return $result;
    }

    function payment_current_status($project_id=NULL,$sch_date=NULL){
       
        $projectDetails = $this->get_row('funds_projects','project_dev_payment_due,project_dev_payment_charge_off,project_late_fee,project_default_interest,project_type,project_payoff_date,project_construction_loan,project_extend_loan,forbearance_agree,forbearance_end_date',array('project_id'=>$project_id));


        $getmissingSchedules = $this->getmissing_payments($project_id);
        
        $getmissingloan_Schedules = array();  
        if($projectDetails['project_construction_loan']=='N' && $projectDetails['project_extend_loan']=='Y'){
        $getmissingloan_Schedules = $this->getmissingloan_payments($project_id);
        }
        
        if(!empty($getmissingloan_Schedules)) {
            $loanschedules =  array_merge($getmissingSchedules,$getmissingloan_Schedules);
        }else{
            $loanschedules = $getmissingSchedules;
        }  
        $sceduledate = ""; 
        if($sch_date!=""){
          $sceduledate = date('Y-m-d',strtotime($sch_date));
        }
        
        $date = "";
        if($loanschedules[0]['schedule_date']!="" && $loanschedules[0]['schedule_date']!="0000-00-00"){
          $date =date('Y-m-d',strtotime($loanschedules[0]['schedule_date'])); 


            $curentdate  = date('Y-m-d');


            $start = strtotime($date);
            $end   = strtotime($curentdate);
            $count = 0;

            while(date('Y-m-d', $start) <= date('Y-m-d', $end)){
            $count = $count + 1;
            $start = strtotime("+1 day", $start);
            }
            $days_delinquent = $count; 
        }  
        

        $pendingPrincipal = $this->get_all_payment_schedule($project_id);
        // print_r($pendingPrincipal);exit();
        
        //echo $date;exit();
        $sub_status = ""; 
       if ($projectDetails['project_dev_payment_due'] != 'Y' && $projectDetails['project_dev_payment_charge_off'] != 'Y' && $date != "" && $projectDetails['project_type']!="FO" &&  $projectDetails['project_type']!="R" && $projectDetails['project_type']!="RS" && $projectDetails['project_type']!="AR" ) {
            //echo "ghg";exit();

        /*$ach_payment_data = $this->get_ach_payment_status($project_id);
                        if($projectDetails['project_extend_loan']=='Y' && $projectDetails['project_construction_loan'] =='N'){

                        $ach_payment_data = $this->get_ach_payment_status1($project_id);
                        }*/

        //Uncoment the above and coment the below code if there are any issues. Changed on 27-5-2020. In the above case ACH is data is checked on developer_loan_schedule table after developer_schedule. It is changed to developer_loan_schedule first and then developer_schedule then. 
        if($projectDetails['project_extend_loan']=='Y' && $projectDetails['project_construction_loan'] =='N')
        {

            $ach_payment_data = $this->get_ach_payment_status1($project_id);
        }
        if(empty($ach_payment_data))
        {
            $ach_payment_data = $this->get_ach_payment_status($project_id);  
        }    
        //Comment above

            $scheduleamount = $loanschedules[0]['schedule_amount'];
           
            if ($projectDetails['project_type'] != 'PC') {
                if (!empty($loanschedules)) {

                   if($sceduledate!="" && $sceduledate > $curentdate){
                     $status = "Current";
                   }else if($days_delinquent>=1 && $days_delinquent<=20){

                        // $ach_payment_data = $this->get_ach_payment_status($project_id);
                        // if($projectDetails['project_extend_loan']=='Y' && $projectDetails['project_construction_loan'] =='N'){

                        // $ach_payment_data = $this->get_ach_payment_status1($project_id);
                        // }
                        // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                      if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                           $status = "ACH Payment Processing";
                        }else{
                           $status = "Grace Period";   
                        }

                    }elseif($days_delinquent>=21 && $days_delinquent<=29){
                         // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                          if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                           $status = "ACH Payment Processing";
                        }else{
                            $status = "Past Due (11 - 29 Days)"; 
                        }
                        
                    }elseif($days_delinquent>=30 && $days_delinquent<=59){

                     // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                          if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                           $status = "ACH Payment Processing";
                        }else{
                           $status = "Past Due (30 - 59 Days)"; 
                        }
                        
                    }elseif($days_delinquent>=60 && $days_delinquent<=90){
                         // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                          if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                           $status = "ACH Payment Processing";
                        }else{
                          $status = "Interest Default (60 - 90  Days)"; 
                      }
                    }elseif($days_delinquent>90){
                         // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                          if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                           $status = "ACH Payment Processing";
                        }else{
                            $status = "Interest Default (90+ Days)"; 
                        }
                    }else{
                      $status = "Current";  
                    }


                }elseif(!empty($pendingPrincipal)){

                    $maturitydate = date('Y-m-d',strtotime($pendingPrincipal['maturity_date']));
                    $curentdate  = date('Y-m-d');
                    $mat_start   = strtotime($maturitydate);//exit();
                    $end   = strtotime($curentdate);
                    $count = 0;//exit();

                    while(date('Y-m-d', $mat_start) <= date('Y-m-d', $end)){
                    $count = $count + 1;
                    $mat_start = strtotime("+1 day", $mat_start);
                    }
                    $days_delinquent = $count;//exit();
                    if($days_delinquent>=1 && $days_delinquent<=20){
                    $status = "Past Maturity (Grace Period)"; 

                    }elseif($days_delinquent>=21 && $days_delinquent<=29){
                    $status = "Past Maturity (11-29 Days)"; 

                    }elseif($days_delinquent>=30 && $days_delinquent<=59){
                    $status = "Past Maturity (30 - 59 Days)"; 
                    }elseif($days_delinquent>=60 && $days_delinquent<=90){
                    $status = "Maturity Default (60 - 90  Days)"; 
                    }elseif($days_delinquent>90){
                    $status = "Maturity Default (90+ Days)"; 
                    }

                    //if($status=="Maturity Default (Grace Period)" || $status=="Maturity Default (11-29 Days)" || $status=="Maturity Default (30 - 59 Days)" || $status=="Maturity Default (60 - 90  Days)" || $status=="Maturity Default (90+ Days)"){
                        $substtaus = $this->get_table('funds_loan_maturity_plan','*',array('project_id'=>$project_id,'current_status' => 'N'),'loan_maturity_plan_id','Desc');
                    // }else{
                    //     $substtaus = $this->get_table('funds_loan_maturity_plan','*',array('project_id'=>$project_id),'loan_maturity_plan_id','Desc');
                    // }

                    

                    $sub_status = "";
                    if(!empty($substtaus)){
                    if($substtaus[0]['status']=='payoff_letter_requested'){
                    $sub_status = "Payoff Letter Requested";
                    }elseif($substtaus[0]['status']=='forbearance_requested'){
                    $sub_status = "Forbearance Agreement Requested";
                    }elseif($substtaus[0]['status']=='payoff_letter_sent'){
                    $sub_status = "Payoff Letter Sent";
                    }elseif($substtaus[0]['status']=='forbearance_sent'){
                    $sub_status = "Forbearance Agreement Sent";
                    }elseif($substtaus[0]['status']=='forbearance_completed'){
                    $sub_status = "Forbearance Agreement Completed";
                    }elseif($substtaus[0]['status']=='loan_extension_complete'){
                    $sub_status = "Loan Extension Complete";
                    }elseif($substtaus[0]['status']=='paid_off'){
                    $sub_status = "Paid Off";
                    }elseif($substtaus[0]['status']=='no_response'){
                    $sub_status = "No Response";
                    }else{
                    $sub_status = '';
                    }
                    }
                    $sub_status = $sub_status;
                } else {
                    $status = "Current";
                }

            } else {
                
                $status = 'Paid';
            }
            
        }elseif(!empty($pendingPrincipal)){
            $nextdate = date('Y-m-d',strtotime($pendingPrincipal['maturity_date']));
             $nextday = date('d',strtotime($nextdate));
 
            if($nextday=="30" || $nextday=="31"){
                $nextdate = date('Y-m-d',strtotime($pendingPrincipal['maturity_date'].'first day of next month'));
            }

             $date = date('Y-m-d',strtotime($date.'first day of next month'));
             $maturitydate = date('Y-m-d',strtotime($pendingPrincipal['maturity_date']));
             $curentdate  = date('Y-m-d');
             $mat_start   = strtotime($maturitydate);//exit();
            $end   = strtotime($curentdate);
            $count = 0;//exit();
           
            while(date('Y-m-d', $mat_start) <= date('Y-m-d', $end)){
            $count = $count + 1;
            $mat_start = strtotime("+1 day", $mat_start);
            }
           $days_delinquent = $count;//exit();

            if($days_delinquent>=1 && $days_delinquent<=20){
            $status = "Past Maturity (Grace Period)"; 
            }elseif($days_delinquent>=21 && $days_delinquent<=29){
                      $status = "Past Maturity (11-29 Days)"; 
                        
            }elseif($days_delinquent>=30 && $days_delinquent<=59){
              $status = "Past Maturity (30 - 59 Days)"; 
            }elseif($days_delinquent>=60 && $days_delinquent<=90){
              $status = "Maturity Default (60 - 90  Days)"; 
            }elseif($days_delinquent>90){
              $status = "Maturity Default (90+ Days)"; 
            }

            $substtaus = $this->get_table('funds_loan_maturity_plan','*',array('project_id'=>$project_id,'current_status' => 'N'),'loan_maturity_plan_id','Desc');

            $sub_status = "";
            if(!empty($substtaus)){
                if($substtaus[0]['status']=='payoff_letter_requested'){
                $sub_status = "Payoff Letter Requested";
                }elseif($substtaus[0]['status']=='forbearance_requested'){
                $sub_status = "Forbearance Agreement Requested";
                }elseif($substtaus[0]['status']=='payoff_letter_sent'){
                $sub_status = "Payoff Letter Sent";
                }elseif($substtaus[0]['status']=='forbearance_sent'){
                $sub_status = "Forbearance Agreement Sent";
                }elseif($substtaus[0]['status']=='forbearance_completed'){
                $sub_status = "Forbearance Agreement Completed";
                }elseif($substtaus[0]['status']=='loan_extension_complete'){
                $sub_status = "Loan Extension Complete";
                }elseif($substtaus[0]['status']=='paid_off'){
                $sub_status = "Paid Off";
                }elseif($substtaus[0]['status']=='no_response'){
                $sub_status = "No Response";
                }else{
                $sub_status = '';
                }
            }
             $sub_status = $sub_status;
            //$status = "Maturity Default";

        }elseif($projectDetails['project_type']=="FO" ||  $projectDetails['project_type']=="R" || $projectDetails['project_type']=="RS" ||  $projectDetails['project_type']=="AR"){

            if($projectDetails['project_type']=="FO"){
                
                $delicomment  = $this->get_deliquent_comments(array('fc.project_id'=>$project_id));
               
                if(!empty($delicomment) && $delicomment[0]['status_id']!=""){
                   if($delicomment[0]['status_id']=="activity11"){
                     $sub_status = "Foreclosure Attorney assigned.";
                   }elseif($delicomment[0]['status_id']=="activity12"){
                     $sub_status = "Closing Package, including all loan documents and recordables sent for review.";
                   }elseif($delicomment[0]['status_id']=="activity13"){
                     $sub_status = "Foreclosure search with judgment search ordered.";
                   }elseif($delicomment[0]['status_id']=="activity14"){
                     $sub_status = "Demand letter to borrower/guarantor sent.";
                   }elseif($delicomment[0]['status_id']=="activity15"){
                     $sub_status = "Review of title report and preparation of summons/complaint underway.";
                   }elseif($delicomment[0]['status_id']=="activity16"){
                     $sub_status = "Sharestates review and approval of complaint underway.";
                   }elseif($delicomment[0]['status_id']=="activity17"){
                     $sub_status = "Filing of complaint completed.";
                   }elseif($delicomment[0]['status_id']=="activity18"){
                     $sub_status = "Service of complaint underway.";
                   }elseif($delicomment[0]['status_id']=="activity19"){
                     $sub_status = "Filing of notice of lis pendens completed.";
                   }elseif($delicomment[0]['status_id']=="activity20"){
                     $sub_status = "Obtaining update title search after lis pendens is recorded and joining additional parties if needed.";
                   }elseif($delicomment[0]['status_id']=="activity21"){
                     $sub_status = "Obtain all returns of service on all defendants underway.";
                   }elseif($delicomment[0]['status_id']=="activity22"){
                     $sub_status = "No answer filed, entering default.";
                   }elseif($delicomment[0]['status_id']=="activity23"){
                     $sub_status = "Preparing payoff figures and Affidavit of Amount Due for submission to court.";
                   }elseif($delicomment[0]['status_id']=="activity24"){
                     $sub_status = "Preparing final judgment package for submission to court.";
                   }elseif($delicomment[0]['status_id']=="activity25"){
                     $sub_status = "Judgment entered, sending writ of execution to sheriff underway.";
                   }elseif($delicomment[0]['status_id']=="activity37"){
                    $sub_status = "Other";
                     if($delicomment[0]['other_opt_description']!=""){
                     $sub_status .= " - ".$delicomment[0]['other_opt_description'];
                     }  
                  
                   }elseif($delicomment[0]['status_id']=="activity31"){
                    $sub_status = "Foreclosure (Sheriff Sale Scheduled)";
                   }elseif($delicomment[0]['status_id']=="activity26"){
                    $sub_status = "Foreclosure (Sheriff Sale Scheduled)";
                   }elseif($delicomment[0]['status_id']=="activity27"){
                    $sub_status = "Foreclosure (Sheriff Sale Scheduled)";
                   }elseif($delicomment[0]['status_id']=="activity36"){
                    $sub_status = "Foreclosure Sheriff Sale (Other)";
                   }elseif($delicomment[0]['status_id']=="activity29"){
                    $sub_status = "Foreclosure (Sheriff Sale Complete - REO)";
                   }elseif($delicomment[0]['status_id']=="activity32" || $delicomment[0]['status_id']=="activity30" || $delicomment[0]['status_id']=="activity28"){
                    $sub_status = "Foreclosure (Sheriff Sale Complete - Property Sold at Auction)";
                   }elseif($delicomment[0]['status_id']=="activity33"){
                    $sub_status = "Paid Off";
                   }elseif($delicomment[0]['status_id']=="activity34"){
                    $sub_status = "Assumed";
                   }elseif($delicomment[0]['status_id']=="activity35"){
                    $sub_status = "Loan Sold";
                   }else{
                    $sub_status = "";
                   }
                   
                
                }
               $status = 'Foreclosure';//exit();
                
            }elseif($projectDetails['project_type']=="R"){
                $status = 'REO';
            }elseif($projectDetails['project_type']=="RS"){
                $status = 'REO Sold & Completed';
            }elseif($projectDetails['project_type']=="AR"){
                $status = 'Alternative Recoveries';
            }


        } else{
            
            $status = "Current";
           // echo $status;exit();
        }

        $forbearance_end_date = $projectDetails['forbearance_end_date'];
        if($projectDetails['forbearance_agree'] == 'Y' && strtotime($forbearance_end_date)>strtotime($sceduledate)){
            $curentdate  = date('Y-m-d');
            $start = strtotime($curentdate);
            $end   = strtotime($forbearance_end_date);
            $count = 0;

            while(date('Y-m-d', $start) <= date('Y-m-d', $end)){
                $count = $count + 1;
                $start = strtotime("+1 day", $start);
            }
            $days_remaining = $count-1;
            if($days_remaining>0){
                $status = "Forbearance (".$days_remaining." Days Remaining)";
            }
        }

        
        $result['status']      = $status;
        $result['sub_status']      = $sub_status;
        $result['days_delinquent'] = $days_delinquent;
        $result['sch_date']    = $sceduledate;
        $result['last_sch_date'] = $date;
      
      return $result;
        
    
    }
    function get_deliquent_comments($arr_where=NULL){
      $this->db->select('fc.status,fc.comments,CreatedDate,CreatedDate,funds_admin.admin_firstname,funds_admin.admin_lastname,fc.status_id,fc.other_opt_description');
      $this->db->join('funds_admin','funds_admin.admin_id= fc.CreatedBy');
      $this->db->from('funds_foreclosure_new_log fc');
      if(!empty($arr_where))
        $this->db->where($arr_where);

      $this->db->order_by('fc.fc_log_id','DESC');
      $this->db->limit(2,0);
      $res    = $this->db->get();
      $result = $res->result_array();
      return $result;
    }
    function getmissing_payments($project_id=NULL)
    {
        
      
        $curdate = date('Y-m-d');
        $this->db->select('funds_payment_schedule.schedule_date');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_projects', 'funds_projects.project_id=funds_payment_schedule.project_id');
        $this->db->join('funds_developer_schedule', 'funds_developer_schedule.schedule_id=funds_payment_schedule.schedule_id','left');
        $this->db->where('funds_payment_schedule.project_id',$project_id);
        $this->db->where('DATE(schedule_date) <=', $curdate);   
       
        $this->db->where("( (funds_projects.project_payoff_date is NULL OR funds_projects.project_payoff_date ='0000-00-00')  OR(funds_projects.project_payoff_date is not null AND funds_projects.project_payoff_date <>'0000-00-00' AND DATE(funds_projects.project_payoff_date) >= '".$curdate."'))");
        $this->db->where('funds_projects.project_type <>', 'PC');
         $this->db->where('funds_projects.project_type <>', 'C');
        $this->db->where('funds_projects.project_dev_payment_due', 'N');
        $this->db->where('funds_projects.project_dev_payment_charge_off', 'N');
        $this->db->where('(funds_payment_schedule.schedule_status = "C" or (funds_payment_schedule.schedule_status = "A" and funds_developer_schedule.schedule_payment_success = "I") )');
        $this->db->where('funds_projects.project_status', 'A');
        $this->db->where('funds_projects.IsDeleted','N');
        $this->db->where('funds_projects.project_type !=','D');
        $this->db->where('funds_projects.project_type !=','FO');
        $this->db->where('funds_projects.project_type !=','R');
        //$this->db->where('funds_projects.project_type !=','AR');
        $this->db->where('(funds_projects.project_construction_loan = funds_payment_schedule.costruction_draw_status)');
        $this->db->order_by('date(funds_payment_schedule.schedule_date)', 'ASC');
        $this->db->group_by('funds_payment_schedule.project_id');
         
        $result = $this->db->get();
        
        return $result->result_array(); 
    }

    function getmissingloan_payments($project_id=NULL)
    {
       
        $curdate = date('Y-m-d');
        $this->db->select('funds_projects.project_id,funds_payment_loan.loan_id,funds_projects.project_name,funds_payment_loan.schedule_date');
        $this->db->from('funds_payment_loan');
        $this->db->join('funds_developer_loan_schedule', 'funds_developer_loan_schedule.loan_id=funds_payment_loan.loan_id','left');
        $this->db->join('funds_projects', 'funds_projects.project_id=funds_payment_loan.project_id');
        $this->db->where('funds_payment_loan.project_id',$project_id);
        $this->db->where('DATE(schedule_date) <=', $curdate);   
       
        //$this->db->where('DATE(schedule_date) <=', $curdate);
        $this->db->where("( (funds_projects.project_payoff_date is NULL OR funds_projects.project_payoff_date ='0000-00-00')  OR(funds_projects.project_payoff_date is not null AND funds_projects.project_payoff_date <>'0000-00-00' AND DATE(funds_projects.project_payoff_date) >= '".$curdate."'))");
        
        $this->db->where('funds_projects.project_type <>', 'PC');
        $this->db->where('funds_projects.project_type <>', 'C');
        $this->db->where('funds_projects.project_dev_payment_due', 'N');
        $this->db->where('funds_projects.project_dev_payment_charge_off', 'N');
        $this->db->where('(funds_payment_loan.schedule_status = "C" or (funds_payment_loan.schedule_status = "A" and funds_developer_loan_schedule.schedule_payment_success = "I") )');
        $this->db->where('funds_projects.project_status', 'A');
        $this->db->where('funds_projects.project_extend_loan', 'Y');
        $this->db->where('funds_projects.IsDeleted','N');
        $this->db->where('funds_projects.project_type !=','D');
        $this->db->where('funds_projects.project_type !=','FO');
        $this->db->where('funds_projects.project_type !=','R');
        //$this->db->where('funds_projects.project_type !=','AR');
        $this->db->order_by('date(funds_payment_loan.schedule_date)', 'ASC');
        $this->db->group_by('funds_payment_loan.project_id');
        $result1 = $this->db->get();
        return $result1->result_array(); //$result;
        
    }
    function getmissingpayments_project($project_id=NULL)
    {   
        $curdate = date('Y-m-d');
        $this->db->select('funds_projects.project_id');
        $this->db->from('funds_payment_schedule');
        $this->db->join('funds_projects', 'funds_projects.project_id=funds_payment_schedule.project_id');
        $this->db->join('funds_developer_schedule', 'funds_developer_schedule.schedule_id=funds_payment_schedule.schedule_id','left');
        //$this->db->where('DATE(schedule_date) <=', $curdate);

        $this->db->where("( (funds_projects.project_payoff_date is NULL OR funds_projects.project_payoff_date ='0000-00-00')  OR(funds_projects.project_payoff_date is not null AND funds_projects.project_payoff_date <>'0000-00-00' AND DATE(funds_projects.project_payoff_date) >= '".$curdate."'))");
        $this->db->where('funds_projects.project_type <>', 'PC');
        $this->db->where('funds_projects.project_dev_payment_due', 'N');
        $this->db->where('funds_projects.project_dev_payment_charge_off', 'N');
        $this->db->where('(funds_payment_schedule.schedule_status = "C" or (funds_payment_schedule.schedule_status = "A" and funds_developer_schedule.schedule_payment_success = "I") )');
        $this->db->where('funds_projects.project_status', 'A');
        $this->db->where('funds_projects.IsDeleted','N');
       
       
          $this->db->where('DATE(schedule_date) <=', $curdate);   
      
        $this->db->where('funds_projects.project_type !=','D');
        $this->db->where('(funds_projects.project_construction_loan = funds_payment_schedule.costruction_draw_status)');
        $this->db->where('funds_payment_schedule.project_id',$project_id);
       // $this->db->where('DATE(schedule_date) <=', $curdate);
        $this->db->order_by('date(funds_payment_schedule.schedule_date)', 'ASC');
        $this->db->group_by('funds_payment_schedule.project_id');
        $result = $this->db->get();
        $arr = $result->result_array();
        $result1 = array();
        foreach ($arr as  $value) {
            $result1[] = $value['project_id'];
        }
        return $result1; 
    }
      #------------------------------------------------------------------------------------------------------------
    public function get_ach_payment_status($project_id){
      $this->db->select('schedule_payment_success,dev_payment_clearance_date,ach_success_status,ach_success_status,ach_rejection_code,ach_rejection_date');
      $this->db->from('funds_developer_schedule');
      $this->db->join('funds_payment_schedule','funds_payment_schedule.schedule_id = funds_developer_schedule.schedule_id');
      $this->db->join('funds_projects','funds_projects.project_construction_loan = funds_payment_schedule.costruction_draw_status AND funds_projects.project_id = funds_payment_schedule.project_id');
      $this->db->where('funds_developer_schedule.project_id',$project_id);
      $this->db->where('funds_developer_schedule.ach_success_status <>',1);
      $this->db->order_by('dev_schedule_id','DESC');
      $this->db->limit(1,0);
      return $this->db->get()->row_array();

    }
    #------------------------------------------------------------------------------------------------------------
    public function get_ach_payment_status1($project_id){
      $this->db->select('schedule_payment_success,dev_payment_clearance_date,ach_success_status,ach_success_status,ach_rejection_code,ach_rejection_date');
      $this->db->from('funds_developer_loan_schedule');
      $this->db->join('funds_payment_loan','funds_payment_loan.loan_id = funds_developer_loan_schedule.loan_id');
      $this->db->where('funds_developer_loan_schedule.project_id',$project_id);
      $this->db->where('funds_developer_loan_schedule.ach_success_status <>',1);
      
      $this->db->order_by('dev_loan_id','DESC');
      $this->db->limit(1,0);
      return $this->db->get()->row_array();

    }

     #------------------------------------------------------------------------------------------------------------
    public function get_ach_payment_reject($project_id){
      $this->db->select('schedule_payment_success,dev_payment_clearance_date,ach_success_status,ach_success_status,ach_rejection_code,ach_rejection_date');
      $this->db->from('funds_developer_schedule');
      $this->db->join('funds_payment_schedule','funds_payment_schedule.schedule_id = funds_developer_schedule.schedule_id');
      $this->db->join('funds_projects','funds_projects.project_construction_loan = funds_payment_schedule.costruction_draw_status AND funds_projects.project_id = funds_payment_schedule.project_id');
      $this->db->where('funds_developer_schedule.project_id',$project_id);
      $this->db->where('funds_developer_schedule.ach_success_status',1);
      $this->db->where('funds_developer_schedule.ach_rejection_code <>',"");
      $this->db->where('funds_developer_schedule.schedule_payment_success',"I");
      $this->db->order_by('dev_schedule_id','DESC');
      $this->db->limit(1,0);
      return $this->db->get()->row_array();

    }
  function get_all_payment_schedule($project_id=NULL){
    $project_details = $this->get_row('funds_projects', 'project_construction_loan', array('project_id' => $project_id));
       $this->db->select('s.project_id,p.project_extend_loan,
        p.project_payment_loan_extension,p.project_construction_loan,
        project_servicing_outsourced,p.servicing_outsourced_to');
      $this->db->from('funds_payment_schedule s');
      $this->db->join('funds_projects p','p.project_id=s.project_id');

      //$this->db->where('(s.project_id NOT IN (select b.project_id from funds_payment_schedule b left join funds_developer_schedule c on b.schedule_id = c.schedule_id where (b.schedule_status="C" OR c.schedule_payment_success="I") and s.project_id = b.project_id))');
      
      if($project_details['project_construction_loan'] == 'Y')
        {
            $this->db->where('(s.project_id NOT IN (select b.project_id from funds_payment_schedule b left join funds_developer_schedule c on b.schedule_id = c.schedule_id where (b.schedule_status="C" OR c.schedule_payment_success="I") and b.costruction_draw_status = "Y" and s.project_id = b.project_id))'); 
        }
        else
        {
            $this->db->where('(s.project_id NOT IN (select b.project_id from funds_payment_schedule b left join funds_developer_schedule c on b.schedule_id = c.schedule_id where (b.schedule_status="C" OR c.schedule_payment_success="I") and s.project_id = b.project_id))');
        }

      $this->db->where('p.project_type <>','PC');
      $this->db->where('(p.project_payoff_date = "" OR p.project_payoff_date = "0000-00-00" OR p.project_payoff_date IS NULL)');//updated on 09/07/2018
      $this->db->where('p.project_status','A');
      $this->db->where('p.project_type <>','FO');
      $this->db->where('p.project_type <>','R');
      //$this->db->where('p.project_type <>','AR');
      $this->db->where('p.project_estimated_term <>','360');
      $this->db->where('p.project_id',$project_id);
      $this->db->where('p.IsDeleted','N');
      $this->db->where('(p.project_construction_loan = s.costruction_draw_status)');  
      $this->db->group_by('s.project_id');
      $res            = $this->db->get();
      $result         = $res->result_array();
      $extend_result  = $this->get_all_payment_schedule_extend($project_id);
      $data_project_array =array();
      $currentDate = date('Y-m-d');
      if(!empty($result)){
          foreach ($result as $key => $value) {
                $maturitysch  = $this->get_maturity_payment_schedule($value['project_id']);
                $maturityDate = date('Y-m-d',strtotime($maturitysch['schedule_date']));
                if($value['project_extend_loan']=='Y' && $value['project_payment_loan_extension']=='N' && $value['project_construction_loan']=='N'){
                  $maturitysch = $this->get_maturity_loan_payment_schedule($value['project_id']);
                  $maturityDate = date('Y-m-d',strtotime($maturitysch['schedule_date']));
                    
                    if(in_array($value['project_id'],$extend_result) && ($maturityDate <= $currentDate)){
                      
                        if(!in_array($value['project_id'],$data_project_array)){
                          $data_project_array[]=$value;
                          $data_project_array['maturity_date'] = $maturityDate;
                        }
                    }
                }elseif($maturityDate <= $currentDate){
                      $data_project_array[]=$value;
                      $data_project_array['maturity_date'] = $maturityDate;
                }
                
          }
      }
      
      return $data_project_array;
    }
    function get_all_payment_schedule_extend($project_id=NULL){
      $this->db->select('s.project_id');
      $this->db->from('funds_payment_loan s');
      $this->db->join('funds_projects p','p.project_id=s.project_id');

      $this->db->where('(s.project_id NOT IN (select b.project_id from funds_payment_loan b left join funds_developer_loan_schedule c on b.loan_id = c.loan_id where (b.schedule_status="C" OR c.schedule_payment_success="I") and s.project_id = b.project_id))');
      $this->db->where('p.project_type <>','PC');
      $this->db->where('(p.project_payoff_date = "" OR p.project_payoff_date = "0000-00-00" OR p.project_payoff_date IS NULL)');//updated on 09/07/2018
      $this->db->where('p.project_status','A');
      $this->db->where('p.project_type <>','FO');
      $this->db->where('p.project_type <>','R');
      //$this->db->where('p.project_type <>','AR');
      $this->db->where('p.IsDeleted','N');
      $this->db->where('p.project_id',$project_id);
      $this->db->group_by('s.project_id');
      $res     = $this->db->get();
      // echo $this->db->last_query();exit;
      $result  = $res->result_array();
      $result1 = array();
        foreach ($result as  $value) {
            $result1[] = $value['project_id'];
        }
        return $result1;
    }
function payment_current_status_mail($project_id=NULL,$sch_date=NULL){
       //  $project_id = "1700";
        $projectDetails = $this->get_row('funds_projects','project_dev_payment_due,project_dev_payment_charge_off,project_late_fee,project_default_interest,project_type,project_payoff_date,project_construction_loan,project_extend_loan',array('project_id'=>$project_id));


        $getmissingSchedules = $this->getmissing_payments($project_id);
        
        $getmissingloan_Schedules = array();  
        if($projectDetails['project_construction_loan']=='N' && $projectDetails['project_extend_loan']=='Y'){
        $getmissingloan_Schedules = $this->getmissingloan_payments($project_id);
        }
        
        if(!empty($getmissingloan_Schedules)) {
            $loanschedules =  array_merge($getmissingSchedules,$getmissingloan_Schedules);
        }else{
            $loanschedules = $getmissingSchedules;
        }  
        $sceduledate = ""; 
        if($sch_date!=""){
          $sceduledate = date('Y-m-d',strtotime($sch_date));
        }
        
        $date = "";
        if($loanschedules[0]['schedule_date']!="" && $loanschedules[0]['schedule_date']!="0000-00-00"){
          $date =date('Y-m-d',strtotime($loanschedules[0]['schedule_date'])); 


            $curentdate  = date('Y-m-d');


            $start = strtotime($date);
            $end   = strtotime($curentdate);
            $count = 0;

            while(date('Y-m-d', $start) <= date('Y-m-d', $end)){
            $count = $count + 1;
            $start = strtotime("+1 day", $start);
            }
            $days_delinquent = $count; 
        }  
        

        $pendingPrincipal = $this->get_all_payment_schedule($project_id);
        // print_r($pendingPrincipal);exit();
        
        //echo $date;exit();
        if ($projectDetails['project_dev_payment_due'] != 'Y' && $projectDetails['project_dev_payment_charge_off'] != 'Y' && $date != "" && $projectDetails['project_type']!="FO" &&  $projectDetails['project_type']!="R" && $projectDetails['project_type']!="RS" && $projectDetails['project_type']!="AR") {

            $scheduleamount = $loanschedules[0]['schedule_amount'];
           
            if ($projectDetails['project_type'] != 'PC') {
                if (!empty($loanschedules)) {

                   if($sceduledate!="" && $sceduledate > $curentdate){
                     $status = "Current";
                   }else if($days_delinquent>=1 && $days_delinquent<=20){

                        $ach_payment_data = $this->get_ach_payment_status($project_id);
                        if($projectDetails['project_extend_loan']=='Y' && $projectDetails['project_construction_loan'] =='N'){

                        $ach_payment_data = $this->get_ach_payment_status1($project_id);
                        }
                        if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                           $status = "ACH Payment Process";
                        }else{
                           $status = "Grace Period";   
                        }

                    }elseif($days_delinquent>=21 && $days_delinquent<=29){
                      $status = "Past Due (11 - 29 Days)"; 
                        
                    }elseif($days_delinquent>=30 && $days_delinquent<=59){
                      $status = "Past Due (30 - 59 Days)"; 
                        
                    }elseif($days_delinquent>=60 && $days_delinquent<=89){
                      $status = "Past Due (60-89 days)"; 
                    }elseif($days_delinquent>=90 ){
                      $status = "Past Due (90+ days)"; 
                    }else{
                      $status = "Current";  
                    }


                }elseif(!empty($pendingPrincipal)){
                  $status = "Maturity Default";
                } else {
                  $status = "Current";
                }

            } else {
                
                $status = 'Paid';
            }
            
        }elseif(!empty($pendingPrincipal)){
            $status = "Maturity Default";
        }elseif($projectDetails['project_type']=="FO" ||  $projectDetails['project_type']=="R" || $projectDetails['project_type']=="RS"){

            if($projectDetails['project_type']=="FO"){
                $status = 'Foreclosure';
            }elseif($projectDetails['project_type']=="R"){
                $status = 'REO';
            }elseif($projectDetails['project_type']=="RS"){
                $status = 'REO Sold & Completed';
            }elseif($projectDetails['project_type']=="AR"){
                $status = 'Alternative Recoveries';
            }


        } else{
            
            $status = "Current";
        }

        
      $result['status']      = $status;
      $result['schedule_date'] =  $date; 
       /* $result['late_fee']    = $late_fee;
        $result['default_fee'] = $default_fee;*/
        return $result;
        
    
    }

    function send_mail_to_admin($mail = [])
    {
        
        $from = $to =$body = $subject = '';
        if(empty($mail))
            return ['status'=>false, 'message' => 'mail content empty'];

        if(isset($mail['from']) && $mail['from'] !=  '' ){
           $from  =  $mail['from'];
        }
        if(isset($mail['to']) && $mail['to'] !=  '' ){
           $to  =  $mail['to'];
        }
        
        if(isset($mail['name']) && $mail['name'] !=  '' ){
           $name  =  $mail['name'];
        }else{
           $name = "Sharestates";
        }
        
        $headers = 'From: '.$name.'  <'.$from.'>' . "\n" . 'MIME-Version: 1.0' . "\n" . 'Content-type: text/html; charset=utf-8' . "\n";
        $headers .= 'Bcc: Greetings@sharestates.com' . "\n";      

        if(isset($mail['bcc']) && !empty($mail['bcc'])){
            if(is_array($mail['bcc'])){
               foreach ($mail['bcc'] as $key => $bcc) {
                   $headers .= 'Bcc: '.$bcc . "\n";
               }
            }else{
                $headers .= 'Bcc: '.$mail['bcc'] . "\n";
            }
        }

        if(isset($mail['cc']) && !empty($mail['cc'])){
            if(is_array($mail['cc'])){
               foreach ($mail['cc'] as $key => $bcc) {
                   $headers .= 'cc: '.$bcc . "\n";
               }
            }else{
                $headers .= 'cc: '.$mail['cc'] . "\n";
            }
        }
        $body = $subject = '';
        if(isset($mail['body']) && !empty($mail['body'])){
            $body = wordwrap($mail['body'], 70, "\n");
        }

        if(isset($mail['subject']) && !empty($mail['subject'])){
              $subject  =  $mail['subject'];
        }
        $headers .= 'X-Mailer: PHP/' . phpversion();
       
        if( $to == '' || $from == '' || $subject == '' || $body == '' )
            return ['status'=>false, 'message' => 'Missing To/From/Subject/Body '];
        return mail($to, $subject, $body, $headers);
    }

    public function getOS() { 

        $user_agent     =   $_SERVER['HTTP_USER_AGENT'];
        $os_platform    =   "Unknown OS Platform";

        $os_array       =   array(
                                '/windows nt 10/i'     =>  'Windows 10',
                                '/windows nt 6.3/i'     =>  'Windows 8.1',
                                '/windows nt 6.2/i'     =>  'Windows 8',
                                '/windows nt 6.1/i'     =>  'Windows 7',
                                '/windows nt 6.0/i'     =>  'Windows Vista',
                                '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
                                '/windows nt 5.1/i'     =>  'Windows XP',
                                '/windows xp/i'         =>  'Windows XP',
                                '/windows nt 5.0/i'     =>  'Windows 2000',
                                '/windows me/i'         =>  'Windows ME',
                                '/win98/i'              =>  'Windows 98',
                                '/win95/i'              =>  'Windows 95',
                                '/win16/i'              =>  'Windows 3.11',
                                '/macintosh|mac os x/i' =>  'Mac OS X',
                                '/mac_powerpc/i'        =>  'Mac OS 9',
                                '/linux/i'              =>  'Linux',
                                '/ubuntu/i'             =>  'Ubuntu',
                                '/iphone/i'             =>  'iPhone',
                                '/ipod/i'               =>  'iPod',
                                '/ipad/i'               =>  'iPad',
                                '/android/i'            =>  'Android',
                                '/blackberry/i'         =>  'BlackBerry',
                                '/webos/i'              =>  'Mobile'
                            );

        foreach ($os_array as $regex => $value) { 

            if (preg_match($regex, $user_agent)) {
                $os_platform    =   $value;
            }

        }   

        return $os_platform;
    }


        function send_user_emailbcc_loan_doc($from = "Greetings@sharestates.com", $to, $subject, $body, $attachment = NULL, $cc = NULL, $bcc = NULL,$invoice = NULL)
    {
        if($from==""){
            $from = "Greetings@sharestates.com";
            $name = "Sharestates";
        }elseif($from == "LoanServicing@sharestates.com"){
            $name = "Sharestates LoanServicing";
        }elseif($from == "processing@sharestates.com"){
            $name = "Sharestates";
        }elseif($from == "investors@sharestates.com"){
            $name = "Sharestates";
        }else{
            $name = "Sharestates";
        }

        if($invoice!='' && $from != "LoanServicing@sharestates.com") {
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n".'Reply-To: steven@sharestates.com' . "\r\n";
        }else if($invoice!='' && $from == "LoanServicing@sharestates.com") {
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: Greetings@sharestates.com' . "\r\n".'Reply-To: steven@sharestates.com' . "\r\n". "\r\n". 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }else if($from == "LoanServicing@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: LoanServicing@sharestates.com' . "\r\n";
        }else if($from == "processing@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: processing@sharestates.com' . "\r\n";
        }else if($from == "investors@sharestates.com"){
           $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: investors@sharestates.com' . "\r\n";
        }else{
            $headers = 'From: '.$name.'  <'.$from.'>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n"  . 'Reply-To: Greetings@sharestates.com' . "\r\n";
        }
       
        //'X-Mailer: PHP/' . phpversion();
        if ($cc != '') {
            
            $headers .= 'cc: help@ssapp.support' . "\r\n";
            
        }
        
        if ($bcc != '') {
           
            $headers .= 'Bcc: help@ssapp.support' . "\r\n";
            //$headers .= 'Bcc: Allen@sharestates.com' . "\r\n";
        }

       
        
        $headers .= 'X-Mailer: PHP/' . phpversion();


        return mail($to, $subject, $body, $headers);
    }

       function payment_loan_current_status($project_id=NULL,$sch_date=NULL){


        $projectDetails = $this->get_row('funds_projects','project_dev_payment_due,project_dev_payment_charge_off,project_late_fee,project_default_interest,project_type,project_payoff_date,project_construction_loan,project_extend_loan,project_default_status',array('project_id'=>$project_id));


        $getmissingSchedules = $this->getmissing_payments($project_id);
        
        $getmissingloan_Schedules = array();  
        if($projectDetails['project_construction_loan']=='N' && $projectDetails['project_extend_loan']=='Y'){
        $getmissingloan_Schedules = $this->getmissingloan_payments($project_id);
        }
        
        if(!empty($getmissingloan_Schedules)) {
            $loanschedules =  array_merge($getmissingSchedules,$getmissingloan_Schedules);
        }else{
            $loanschedules = $getmissingSchedules;
        }  
        $sceduledate = ""; 
        if($sch_date!=""){
          $sceduledate = date('Y-m-d',strtotime($sch_date));
        }
        
        $date = "";
        if($loanschedules[0]['schedule_date']!="" && $loanschedules[0]['schedule_date']!="0000-00-00"){
          $date =date('Y-m-d',strtotime($loanschedules[0]['schedule_date'])); 


            $curentdate  = date('Y-m-d');


            $start = strtotime($date);
            $end   = strtotime($curentdate);
            $count = 0;

            while(date('Y-m-d', $start) <= date('Y-m-d', $end)){
            $count = $count + 1;
            $start = strtotime("+1 day", $start);
            }
            $days_delinquent = $count; 
        }  
        

        $pendingPrincipal = $this->get_all_payment_schedule($project_id);
        // print_r($pendingPrincipal);exit();
        
        //echo $date;exit();
        $sub_status = ""; 
       if ($projectDetails['project_dev_payment_due'] != 'Y' && $projectDetails['project_dev_payment_charge_off'] != 'Y' && $date != "" && $projectDetails['project_type']!="FO" &&  $projectDetails['project_type']!="R" && $projectDetails['project_type']!="RS" && $projectDetails['project_type']!="AR" ) {
            //echo "ghg";exit();

        $ach_payment_data = $this->get_ach_payment_status($project_id);
                        if($projectDetails['project_extend_loan']=='Y' && $projectDetails['project_construction_loan'] =='N'){

                        $ach_payment_data = $this->get_ach_payment_status1($project_id);
                        }

            $scheduleamount = $loanschedules[0]['schedule_amount'];
           
            if ($projectDetails['project_type'] != 'PC') {
                if (!empty($loanschedules)) {

                   if($sceduledate!="" && $sceduledate > $curentdate){
                       $payment_status = "Current";
                       $loan_status = "In Repayment";
                   }else if($days_delinquent>=1 && $days_delinquent<=20){

                        // $ach_payment_data = $this->get_ach_payment_status($project_id);
                        // if($projectDetails['project_extend_loan']=='Y' && $projectDetails['project_construction_loan'] =='N'){

                        // $ach_payment_data = $this->get_ach_payment_status1($project_id);
                        // }
                        // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                      if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                           //$status = "ACH Payment Processing";
                            $payment_status = "Current";
                            $loan_status = "In Repayment";
                            $sub_status = "ACH Payment Processing";
                        }else{
                          // $status = "Grace Period";   
                            $payment_status = "Current";
                            $loan_status = "In Repayment";
                            $sub_status = "Grace Period"; 
                        }

                    }elseif($days_delinquent>=21 && $days_delinquent<=29){
                         // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                          if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                          // $status = "ACH Payment Processing";
                            $payment_status = "Current";
                            $loan_status = "In Repayment";
                            $sub_status = "ACH Payment Processing"; 

                        }else{

                            $payment_status = "Past Due (11 - 29 Days)";
                            $sub_status = "Interest"; 
                            $loan_status = "Non-performing";
                            //$status = "Past Due (11 - 29 Days)"; 
                        }
                        
                    }elseif($days_delinquent>=30 && $days_delinquent<=59){

                     // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                          if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                          // $status = "ACH Payment Processing";
                            $payment_status = "Interest 30-59 days past due";
                            $sub_status = "ACH Payment Processing";
                            $loan_status = "In Repayment";
                        }else{
                           //$status = "Past Due (30 - 59 Days)"; 
                            $payment_status = "Interest 30-59 days past due";
                            $sub_status = "Interest";
                            $loan_status = "Non-performing";
                        }
                        
                    }elseif($days_delinquent>=60 && $days_delinquent<=89){
                         // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                          if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                           //$status = "ACH Payment Processing";
                            $payment_status = "Interest 60 - 89 days past due";
                            $sub_status = "ACH Payment Processing";
                            $loan_status = "Non-performing";
                        }else{
                          //$status = "Interest Default (60 - 90  Days)"; 
                          $payment_status = "Interest 60 - 89 days past due";
                          $sub_status = "Interest";
                          $loan_status = "Non-performing";
                      }
                    }elseif($days_delinquent>=90){
                         // if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && $ach_payment_data['ach_rejection_code'] =='' && ($ach_payment_data['ach_rejection_date'] == '0000-00-00' || $ach_payment_data['ach_rejection_date'] == '')){
                          if(!empty($ach_payment_data) && ($ach_payment_data['schedule_payment_success'] == 'I' && ($ach_payment_data['dev_payment_clearance_date'] == '0000-00-00' || $ach_payment_data['dev_payment_clearance_date'] == '')) && ($ach_payment_data['ach_rejection_code'] =='' || $ach_payment_data['ach_rejection_code'] =='0') ){
                           //$status = "ACH Payment Processing";
                            $payment_status = "Defaulted";
                            $sub_status = "ACH Payment Processing";

                            $loan_status = "In Repayment";
                        }else{
                            //$status = "Interest Default (90+ Days)"; 
                            $payment_status = "Defaulted";
                            $sub_status = "Interest";
                            $loan_status = "Non-performing";
                            
                        }
                    }else{
                     // $status = "Current";  
                        $payment_status = "Current";
                        $loan_status = "In Repayment";
                    }


                }elseif(!empty($pendingPrincipal)){

                    $maturitydate = date('Y-m-d',strtotime($pendingPrincipal['maturity_date']));
                    $curentdate  = date('Y-m-d');
                    $mat_start   = strtotime($maturitydate);//exit();
                    $end   = strtotime($curentdate);
                    $count = 0;//exit();

                    while(date('Y-m-d', $mat_start) <= date('Y-m-d', $end)){
                    $count = $count + 1;
                    $mat_start = strtotime("+1 day", $mat_start);
                    }
                    $days_delinquent = $count;//exit();
                    if($days_delinquent>=1 && $days_delinquent<=20){
                    //$status = "Maturity Default (Grace Period)"; 
                     $payment_status = "Principal (Grace Period)";
                     $sub_status = "Maturity";
                     $loan_status = "In Repayment";

                    }elseif($days_delinquent>=21 && $days_delinquent<=29){
                    //$status = "Maturity Default (11-29 Days)"; 
                     $payment_status = "Principal 11-29 days past due";
                     $sub_status = "Maturity";
                     $loan_status = "Non-performing";

                    }elseif($days_delinquent>=30 && $days_delinquent<=59){
                    //$status = "Maturity Default (30 - 59 Days)"; 
                     $payment_status = "Principal 30-59 days past due";
                     $sub_status = "Maturity";
                     $loan_status = "Non-performing";
                    }elseif($days_delinquent>=60 && $days_delinquent<=89){
                    //$status = "Maturity Default (60 - 90  Days)"; 
                     $payment_status = "Principal 60-89 days past due";
                     $sub_status = "Maturity";
                     $loan_status = "Non-performing";
                    }elseif($days_delinquent>=90){
                    //$status = "Maturity Default (90+ Days)"; 
                     $payment_status = "Defaulted";
                     $sub_status = "Maturity";
                     $loan_status = "Non-performing";
                    }

                    if(!empty($loanschedules)){
                
                        $sub_status = 'Interest & Maturity';
                     }

                    //if($status=="Maturity Default (Grace Period)" || $status=="Maturity Default (11-29 Days)" || $status=="Maturity Default (30 - 59 Days)" || $status=="Maturity Default (60 - 90  Days)" || $status=="Maturity Default (90+ Days)"){
                        $substtaus = $this->get_table('funds_loan_maturity_plan','*',array('project_id'=>$project_id,'current_status' => 'N'),'loan_maturity_plan_id','Desc');
                    // }else{
                    //     $substtaus = $this->get_table('funds_loan_maturity_plan','*',array('project_id'=>$project_id),'loan_maturity_plan_id','Desc');
                    // }

                    

                   // $sub_status = "";
                    if(!empty($substtaus)){
                    if($substtaus[0]['status']=='payoff_letter_requested'){
                    $sub_status = "Payoff Letter Requested";
                    }elseif($substtaus[0]['status']=='forbearance_requested'){
                    $sub_status = "Forbearance Agreement Requested";
                    $loan_status = "Forbearance";
                    }elseif($substtaus[0]['status']=='payoff_letter_sent'){
                    $sub_status = "Payoff Letter Sent";
                    }elseif($substtaus[0]['status']=='forbearance_sent'){
                    $sub_status = "Forbearance Agreement Sent";
                    $loan_status = "Forbearance";
                    }elseif($substtaus[0]['status']=='forbearance_completed'){
                    $sub_status = "Forbearance Agreement Completed";
                    $loan_status = "Forbearance";
                    }elseif($substtaus[0]['status']=='loan_extension_complete'){
                    $sub_status = "Loan Extension Complete";
                    }elseif($substtaus[0]['status']=='paid_off'){
                    $sub_status = "Paid Off";
                    }elseif($substtaus[0]['status']=='no_response'){
                    $sub_status = "No Response";
                    }else{
                    $sub_status = '';
                    }
                    }
                    $sub_status = $sub_status;
                } else {
                   // $status = "Current";
                    $payment_status = "Current";
                    $loan_status = "In Repayment";
                    $sub_status = '';
                }

            } else {
                
               // $status = 'Paid';
                $payment_status = "Paid Off";
                $sub_status = '';
                $loan_status = "Satisfied";
                $loan_sub_status = "Paid Off";
            }
            
        }elseif(!empty($pendingPrincipal)){
            $nextdate = date('Y-m-d',strtotime($pendingPrincipal['maturity_date']));
             $nextday = date('d',strtotime($nextdate));


            if($nextday=="30" || $nextday=="31"){
                $nextdate = date('Y-m-d',strtotime($pendingPrincipal['maturity_date'].'first day of next month'));
            }

             $date = date('Y-m-d',strtotime($date.'first day of next month'));
             $maturitydate = date('Y-m-d',strtotime($pendingPrincipal['maturity_date']));
             $curentdate  = date('Y-m-d');
             $mat_start   = strtotime($maturitydate);//exit();
            $end   = strtotime($curentdate);
            $count = 0;//exit();
           
            while(date('Y-m-d', $mat_start) <= date('Y-m-d', $end)){
            $count = $count + 1;
            $mat_start = strtotime("+1 day", $mat_start);
            }
           $days_delinquent = $count;//exit();

            if($days_delinquent>=1 && $days_delinquent<=20){
           // $status = "Maturity Default (Grace Period)"; 
                $payment_status = "Principal (Grace Period)";
                $sub_status = 'Maturity';
                 $loan_status = "In Repayment";
            }elseif($days_delinquent>=21 && $days_delinquent<=29){
                     // $status = "Maturity Default (11-29 Days)"; 
                $payment_status = "Principal 11-29 days past due";
                $sub_status = 'Maturity';
                 $loan_status = "Non-performing";
                        
            }elseif($days_delinquent>=30 && $days_delinquent<=59){
              //$status = "Maturity Default (30 - 59 Days)"; 
                $payment_status = "Principal 30-59 days past due";
                $sub_status = 'Maturity';
                 $loan_status = "Non-performing";
            }elseif($days_delinquent>=60 && $days_delinquent<=89){
              //$status = "Maturity Default (60 - 90  Days)"; 
                $payment_status = "Principal 60-89 days past due";
                $sub_status = 'Maturity';
                $loan_status = "Non-performing";
            }elseif($days_delinquent>=90){
             // $status = "Maturity Default (90+ Days)"; 
                $payment_status = "Defaulted";
                $sub_status = 'Maturity';
                $loan_status = "Non-performing";
            }

             if(!empty($loanschedules)){
                
                $sub_status = 'Interest & Maturity';
             }
 

            $substtaus = $this->get_table('funds_loan_maturity_plan','*',array('project_id'=>$project_id,'current_status' => 'N'),'loan_maturity_plan_id','Desc');

            //$sub_status = "";
            if(!empty($substtaus)){
                if($substtaus[0]['status']=='payoff_letter_requested'){
                $sub_status = "Payoff Letter Requested";
                }elseif($substtaus[0]['status']=='forbearance_requested'){
                $loan_status = "Forbearance";
                $sub_status = "Forbearance Agreement Requested";
                }elseif($substtaus[0]['status']=='payoff_letter_sent'){
                $sub_status = "Payoff Letter Sent";
                }elseif($substtaus[0]['status']=='forbearance_sent'){
                $loan_status = "Forbearance";
                $sub_status = "Forbearance Agreement Sent";
                }elseif($substtaus[0]['status']=='forbearance_completed'){
                $sub_status = "Forbearance Agreement Completed";
                $loan_status = "Forbearance";
                }elseif($substtaus[0]['status']=='loan_extension_complete'){
                $sub_status = "Loan Extension Complete";
                }elseif($substtaus[0]['status']=='paid_off'){
                $sub_status = "Paid Off";
                }elseif($substtaus[0]['status']=='no_response'){
                $sub_status = "No Response";
                }else{
                $sub_status = '';
                }
            }
             $sub_status = $sub_status;
            //$status = "Maturity Default";

        }elseif($projectDetails['project_type']=="FO" ||  $projectDetails['project_type']=="R" || $projectDetails['project_type']=="RS" ||  $projectDetails['project_type']=="AR"){

            if($projectDetails['project_type']=="FO"){
                
                $delicomment  = $this->get_deliquent_comments(array('fc.project_id'=>$project_id));
               
                if(!empty($delicomment) && $delicomment[0]['status_id']!=""){
                   if($delicomment[0]['status_id']=="activity11"){
                     $sub_status = "Foreclosure Attorney assigned.";
                   }elseif($delicomment[0]['status_id']=="activity12"){
                     $sub_status = "Closing Package, including all loan documents and recordables sent for review.";
                   }elseif($delicomment[0]['status_id']=="activity13"){
                     $sub_status = "Foreclosure search with judgment search ordered.";
                   }elseif($delicomment[0]['status_id']=="activity14"){
                     $sub_status = "Demand letter to borrower/guarantor sent.";
                   }elseif($delicomment[0]['status_id']=="activity15"){
                     $sub_status = "Review of title report and preparation of summons/complaint underway.";
                   }elseif($delicomment[0]['status_id']=="activity16"){
                     $sub_status = "Sharestates review and approval of complaint underway.";
                   }elseif($delicomment[0]['status_id']=="activity17"){
                     $sub_status = "Filing of complaint completed.";
                   }elseif($delicomment[0]['status_id']=="activity18"){
                     $sub_status = "Service of complaint underway.";
                   }elseif($delicomment[0]['status_id']=="activity19"){
                     $sub_status = "Filing of notice of lis pendens completed.";
                   }elseif($delicomment[0]['status_id']=="activity20"){
                     $sub_status = "Obtaining update title search after lis pendens is recorded and joining additional parties if needed.";
                   }elseif($delicomment[0]['status_id']=="activity21"){
                     $sub_status = "Obtain all returns of service on all defendants underway.";
                   }elseif($delicomment[0]['status_id']=="activity22"){
                     $sub_status = "No answer filed, entering default.";
                   }elseif($delicomment[0]['status_id']=="activity23"){
                     $sub_status = "Preparing payoff figures and Affidavit of Amount Due for submission to court.";
                   }elseif($delicomment[0]['status_id']=="activity24"){
                     $sub_status = "Preparing final judgment package for submission to court.";
                   }elseif($delicomment[0]['status_id']=="activity25"){
                     $sub_status = "Judgment entered, sending writ of execution to sheriff underway.";
                   }elseif($delicomment[0]['status_id']=="activity37"){
                    $sub_status = "Other";
                     if($delicomment[0]['other_opt_description']!=""){
                     $sub_status .= " - ".$delicomment[0]['other_opt_description'];
                     }  
                  
                   }elseif($delicomment[0]['status_id']=="activity31"){
                    $sub_status = "Foreclosure (Sheriff Sale Scheduled)";
                    $payment_status = "Sheriff Sale";
                   }elseif($delicomment[0]['status_id']=="activity26"){
                    $sub_status = "Foreclosure (Sheriff Sale Scheduled)";
                    $payment_status = "Sheriff Sale";
                   }elseif($delicomment[0]['status_id']=="activity27"){
                    $sub_status = "Foreclosure (Sheriff Sale Scheduled)";
                    $payment_status = "Sheriff Sale";
                   }elseif($delicomment[0]['status_id']=="activity36"){
                    $sub_status = "Foreclosure Sheriff Sale (Other)";
                    $payment_status = "Sheriff Sale";
                   }elseif($delicomment[0]['status_id']=="activity29"){
                    $sub_status = "Foreclosure (Sheriff Sale Complete - REO)";
                    $payment_status = "Sheriff Sale";
                   }elseif($delicomment[0]['status_id']=="activity32" || $delicomment[0]['status_id']=="activity30" || $delicomment[0]['status_id']=="activity28"){
                    $sub_status = "Foreclosure (Sheriff Sale Complete - Property Sold at Auction)";
                    $payment_status = "Sheriff Sale";
                   }elseif($delicomment[0]['status_id']=="activity33"){
                    $sub_status = "Paid Off";
                   }elseif($delicomment[0]['status_id']=="activity34"){
                    $sub_status = "Assumed";
                   }elseif($delicomment[0]['status_id']=="activity35"){
                    $sub_status = "Loan Sold";
                   }else{
                    $sub_status = "";
                   }
                   
                
                }
               //$status = 'Foreclosure';//exit();
                $payment_status = "Foreclosure";
                $loan_status = "Satisfied";
                
                
            }elseif($projectDetails['project_type']=="R"){
                // $status = 'REO';
                $payment_status = 'REO';
                $loan_status = "Satisfied";
                $loan_sub_status = "REO";
            }elseif($projectDetails['project_type']=="RS"){
               // $status = 'REO Sold & Completed';
                $payment_status = 'REO Sold & Completed';
                $loan_status = "Satisfied";
                $loan_sub_status = "REO Sold & Completed";
            }elseif($projectDetails['project_type']=="AR"){
                //$status = 'Alternative Recoveries';
                $payment_status = 'Alternative Recoveries';
                $loan_status = "Satisfied";
                $loan_sub_status = "Alternative Recoveries";
            }


        } else{
            
          //  $status = "Current";
            $payment_status = "Current";
            $loan_status = "In Repayment";
            $sub_status = "";
           // echo $status;exit();
        }
        if($projectDetails['project_default_status']=='Y'){
           $loan_status = "Reperform";
        }else{
            $loan_status = $loan_status;
        }
        
        $result['payment_status']      = $payment_status;
        $result['sub_status']          = $sub_status;
        $result['loan_status']         = $loan_status;
        $result['loan_sub_status']     = $loan_sub_status;
        $result['days_delinquent']     = $days_delinquent;
        $result['sch_date']            = $sceduledate;
        $result['last_sch_date']       = $date;
      
      return $result;
        
    
   
    }

    function get_deny_states(){

    $this->db->select('funds_location.state');
    $this->db->from('funds_location');
    $this->db->join("quik_loan_app_deny_states","funds_location.location_id=quik_loan_app_deny_states.location_id",'left');
    $this->db->where('quik_loan_app_deny_states.status','A');
    $this->db->order_by('funds_location.state','asc');
    $result = $this->db->get();
    return $result->result_array();
}

    function dateDifference($date_1 , $date_2 , $differenceFormat = '%a' )
    {
        $date_2 = $date_2." 24:00:00";
        $datetime1 = date_create($date_1);
        $datetime2 = date_create($date_2);
       
        $interval = date_diff($datetime1, $datetime2);
       
        return $interval->format($differenceFormat);
       
    }

    public function page_visit_log()
    {   
        $page_url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
        $arr_data = array('page_url'=>$page_url,'admin_id'=>$this->session->userdata('SESS_ADMINID'),'page_visit_date'=>date('Y-m-d H:i:s'),'ip_address'=>$_SERVER['REMOTE_ADDR']);
        $this->db->set($arr_data);
        $this->db->insert('funds_page_visit_log');
    }

    public function send_draw_email($from = "draws@sharestates.com", $to, $subject, $body, $bcc = NULL,$cc=NULL){
        
        $headers = 'From: Sharestates Draws <draws@sharestates.com>' . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=utf-8' . "\r\n" . 'Reply-To: draws@sharestates.com' . "\r\n";
        
        if ($cc != '') {
            //$headers .= 'cc: help@ssapp.support' . "\r\n";
        }

        $headers .= 'Bcc: help@ssapp.support' . "\r\n";

        $headers .= 'X-Mailer: PHP/' . phpversion();
        $body = wordwrap($body, 70, "\n");
        return mail($to, $subject, $body, $headers);
    }




      function get_count($tablename = '', $fields = '', $where = '') {

        $this->db->where($where);

        $this->db->select('COUNT(*) as cnt');

        $this->db->from($tablename);

        $query  = $this->db->get();
        $result = $query->row_array();

        if ($this->db->_error_message()){
            $result['cnt']=0;
            return $result;
        }
        else{
            return $result;
        }

    }

       function get_pending_doc_with_signed_status($project,$file_type){

        $this->db->select('funds_pending_documents.*,esign_documents_details.status,u.admin_firstname,u.admin_lastname');
        $this->db->from('funds_pending_documents');
        $this->db->join("esign_documents_details","funds_pending_documents.pending_doc_id=esign_documents_details.doc_id",'left');
        $this->db->join('funds_admin u', 'u.admin_id=funds_pending_documents.uploaded_by');
        $this->db->where('funds_pending_documents.project_id',$project);
        $this->db->where('funds_pending_documents.project_doc_type',$file_type);
        $this->db->order_by('funds_pending_documents.pending_doc_id','desc');
        $result = $this->db->get();
        return $result->result_array();
    }


}
