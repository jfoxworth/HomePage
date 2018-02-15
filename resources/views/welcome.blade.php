<!DOCTYPE html>
<html lang="en">

@include('head')

<body>

    <div class="wrapper">

        <!-- Preloader -->

        <div id="preloader">
            <div id="status">
                <div class="status-mes"><h4>Joshua Foxworth</h4></div>
            </div>
        </div>


        @include('navbar')

        @include('intro')

        @include('candidate')

        @include('profile')

        @include('stats')

        <!-- @include('services') -->

        @include('status')

        <!-- @include('resume') -->

        <!-- @include('contact') -->

        @include('footer')


    </div><!-- .wrapper -->

    @include('jscript')


</body>
</html>