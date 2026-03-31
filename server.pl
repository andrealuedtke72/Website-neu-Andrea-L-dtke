#!/usr/bin/perl
use strict;
use warnings;
use IO::Socket::INET;

my $port = 8080;
my %mime = (
  html  => 'text/html; charset=utf-8',
  css   => 'text/css',
  js    => 'application/javascript',
  png   => 'image/png',
  jpg   => 'image/jpeg',
  jpeg  => 'image/jpeg',
  gif   => 'image/gif',
  svg   => 'image/svg+xml',
  ico   => 'image/x-icon',
  woff  => 'font/woff',
  woff2 => 'font/woff2',
  ttf   => 'font/ttf',
  webp  => 'image/webp',
  docx  => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
);

my $server = IO::Socket::INET->new(
  LocalPort => $port,
  Listen    => 10,
  ReuseAddr => 1,
) or die "Cannot bind to port $port: $!\n";

print "Server running at http://localhost:$port/\n";

while (my $client = $server->accept()) {
  my $request = <$client>;
  1 while defined(my $h = <$client>) && $h ne "\r\n" && $h ne "\n";

  if ($request && $request =~ /^GET\s+([^\s]+)/) {
    my $path = $1;
    $path =~ s/\?.*//;
    $path =~ s/%([0-9A-Fa-f]{2})/chr(hex($1))/ge;
    $path = '/index.html' if $path eq '/';
    $path =~ s|\.\.||g;

    my $file = '.' . $path;
    if (-d $file) { $file .= '/index.html'; }

    if (-f $file) {
      my ($ext) = $file =~ /\.([^.]+)$/;
      my $mime = $mime{lc($ext // '')} // 'application/octet-stream';
      open(my $fh, '<:raw', $file) or do {
        print $client "HTTP/1.0 500 Error\r\n\r\n";
        close($client); next;
      };
      local $/; my $content = <$fh>; close($fh);
      print $client "HTTP/1.0 200 OK\r\nContent-Type: $mime\r\nContent-Length: " . length($content) . "\r\n\r\n";
      print $client $content;
    } else {
      print $client "HTTP/1.0 404 Not Found\r\nContent-Type: text/plain\r\n\r\n404 Not Found: $path\n";
    }
  }
  close($client);
}
