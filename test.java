public static void addTimerListener(String listener){
    listeners.add(listener);
    LOG.info();
}

private void testSplitAndAggregateInOut() throws Exception{
    MockEndpoint mock=getMockEndpoint("mock:result");
    mock.expectedBodiesReceived(expectedBody);
    Object out=template.requestBody("direct:start","A@B@C");
    assertEquals(expectedBody,out);
    LOG.debug("Reponse to caller:"+out);
}

private void munmap(MappedByteBuffer buffer){
  if (CleanerUtil.UNMAP_SUPPORTED) {
    try {
      CleanerUtil.getCleaner().freeBuffer(buffer);
    }
 catch (    IOException e) {
      LOG.warn("Failed to unmap the buffer",e);
    }
  }
 else {
    LOG.trace(CleanerUtil.UNMAP_NOT_SUPPORTED_REASON);
  }
}

public void simpleReadAfterWrite(final FileSystem fs) throws IOException {
  LOG.info("Testing read-after-write with FS implementation: {}",fs);
  final Path path=new Path(TEST_PATH,FILENAME);
  if (!fs.mkdirs(path.getParent())) {
    throw new IOException("Mkdirs failed to create " + TEST_PATH);
  }
  try (FSDataOutputStream out=fs.create(path)){
    out.writeUTF(TEXT);
  }
   try (FSDataInputStream in=fs.open(path)){
    final String result=in.readUTF();
    Assert.assertEquals("Didn't read back text we wrote.",TEXT,result);
  }
 }

void close() throws IOException {
  if (null != this.byteBuffer) {
    this.byteBuffer.clear();
  }
  IOException exception=null;
  try {
    if (null != randomAccessFile) {
      this.randomAccessFile.close();
    }
  }
 catch (  IOException e) {
    LOG.error("Close the random access file occurs an exception.",e);
    exception=e;
  }
  if (this.byteBuffer instanceof MappedByteBuffer) {
    munmap((MappedByteBuffer)this.byteBuffer);
  }
  if (null != this.file && this.file.exists()) {
    if (!this.file.delete()) {
      LOG.warn("Delete the tmp file: [{}] failed.",this.file.getAbsolutePath());
    }
  }
  if (null != exception) {
    throw exception;
  }
}



private File createDir(String dirPath) throws IOException {
  File dir=new File(dirPath);
  if (!dir.exists()) {
    LOG.debug("Buffer dir: [{}] does not exists. create it first.",dirPath);
    if (dir.mkdirs()) {
      if (!dir.setWritable(true) || !dir.setReadable(true) || !dir.setExecutable(true)) {
        LOG.warn("Set the buffer dir: [{}]'s permission [writable," + "readable, executable] failed.",dir.getAbsolutePath());
      }
      LOG.debug("Buffer dir: [{}] is created successfully.",dir.getAbsolutePath());
    }
 else {
      if (!dir.exists()) {
        throw new IOException("buffer dir:" + dir.getAbsolutePath() + " is created unsuccessfully");
      }
    }
  }
 else {
    LOG.debug("buffer dir: {} already exists.",dirPath);
  }
  return dir;
}