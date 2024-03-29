<?php 
    session_start();

    if(!isset($_SESSION['username']))
    {
      $message = "Sign in to access your account.";
    }
    else {
      $message = "You are logged in.";
    }
?>

<!DOCTYPE html>
<!-- saved from url=(0027)https://www.discoverci.com/ -->
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Home | G8T8</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
      <link rel="stylesheet" media="all" href="styles.css">
      <script src="https://code.jquery.com/jquery-3.4.1.js"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>

  <!-- body starts -->
  <body class="gray-bg landing-page  pace-done">
    
    <!-- header section -->
    <div class="navbar-wrapper blue-section">
      <nav class="navbar contentNavigation">
        <div class="container-fluid">
        
          <div class="navbar-header">
              <!-- LOGO HERE -->
                <a href=""><img height="200" width="200" alt="G8T8 Logo" class="img-responsive logo-img" src="./resources/g8t8.png"></a>
              <!-- lOGO ENDS HERE-->
          </div>
          
          <!-- header right-->
          <div id="topNavbar" class="navbar-collapse collapse">
              <div class="navbar-right">
                <ul class="nav navbar-nav navLinksTop">
                  <!-- <li><a href="">Screener</a></li> -->
                  <!-- <li><a href="">Trade Ideas</a></li> -->
                  <li class="dropdown">
                    <!-- <a href="">Stock Charts</a>
                    <ul class="dropdown-menu">
                      <li><a href="">Technical Charts</a></li>
                      <li><a href="">Fundamental Charts</a></li>
                    </ul>
                  -->
                  </li>
                  <!-- <li><a href="./companies.html">Companies</a></li> -->
                  <!-- <li><a href="">Blog</a></li> -->
                    <!-- <li><a href="signin.html">Sign In</a></li> -->
                    <li>
                    <?php 
                    if(!isset($_SESSION['username']))
                    {
                      echo "<a class='btn btn-outline-visualize nav-btn' href='signin.php'>Sign In</a>";
                    } else {
                      echo "<a class='btn btn-outline-visualize nav-btn' href='home.php'>Logout</a>";
                      session_destroy();
                    }
                    ?>
                    </li>
                </ul>
              </div>
              <!-- header right ends-->
            </div>

        </div>
      </nav>
    </div>
    <!-- header section ends -->
    
    <!-- lower section -->
    <div class="landingHeader"> 
      <div class="top-content">
        <section>
          <div class="container">
            <div class="row">
            <?php echo $message; ?>
              <div class="col-md-10 center-block col-centered">
                <h1 class="landing-header">
                  Tools to find undervalued stocks, monitor your investments and grow your portfolio
                </h1>
                <div class="col-md-10 center-block col-centered">
                  <p class="medium-paragraph">
                    G8T8's stock research, valuation and analysis tools enable you to find, analyze, and track your investments like a pro.
                  </p>
                </div> 
                <div class="col-sm-10 center-block col-centered" style="margin-bottom: 10px;">
                  <!-- <form action="" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="✓"> -->
                    <div id="report-search">
                      <div class="col-sm-8 col-md-9" style="padding-right: 0px;">
                        <div class="easy-autocomplete eac-description" style="width: 553px;">
                          <input placeholder="Search Stock Ticker" id='search_input' class="form-control input-lg topnavbar-search input-shadow b-r-md" id="report-search" type="text" name="term" autocomplete="off">
                          <div class="easy-autocomplete-container" id="eac-container-report-search"><ul></ul></div></div>
                        </div>
                        <div class="col-sm-4 col-md-3" style="padding-right: 0px;">
                          <button type="submit" id='search_ticker' class="btn btn-primary input-lg btn-primary-shadow subscribe-button">
                            Search
                          </button>
                        </div>
                    </div>
                    <span id='error' style="font-size: large; display: none; margin-top: 5px; color: rgb(223, 62, 94);">Ticker not found!</span>
                  <!-- </form> -->          
                </div>
              </div>
            </div>
            <div class="laptop-wrapper">

              <!-- <img height="370px" width="570px" class="img-responsive" src="./resources/replace.PNG"> -->

            </div>
          </div>
        </section>
        <div class="backstretch">
          
          <!-- <img height="100%" width="100%" alt="Homepage Background Cover" class="homepage-bg" src="./resources/background.png"> -->
          
        </div>
      </div>
    </div>
<!-- lower section ends -->


</body>

<script type="text/javascript" src="./scripts/check.js"></script>

</html>